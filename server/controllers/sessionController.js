const Session = require("../models/session"); //Session Model
const Cart = require("../models/cart"); //Cart Model
const User = require("../models/user"); //User Model
const mongoose = require("mongoose"); //Database

// Utility to generate readable session codes
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g. C9X2K8
};

exports.createSession = async (req, res) => {
  const { sessionType, sessionName, passcode, participants } = req.body;
  const userId = req.user.id;

  if (!sessionType || !sessionName) {
    return res
      .status(400)
      .json({ message: "Session type and name are required" });
  }

  try {
    // Generate cart first
    const newCart = await Cart.create({
      userId,
      sessionUsers: [{ userId, role: "creator" }],
      products: [],
      totalPrice: 0,
    });

    // Generate unique session code (loop retry optional later)
    const sessionCode = generateCode();

    const newSession = new Session({
      sessionType,
      sessionName,
      cartId: newCart._id,
      createdBy: userId,
      participants,
      sessionCode,
      passcode: passcode || null,
      invitedUsers: [{ userId, role: "creator" }],
    });

    await newSession.save();

    res.status(201).json({
      message: "Session created successfully",
      session: {
        id: newSession._id,
        name: newSession.sessionName,
        sessionCode: newSession.sessionCode,
        passcodeRequired: !!newSession.passcode,
      },
    });
  } catch (error) {
    console.error("createSession error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the session" });
  }
};

exports.inviteUser = async (req, res) => {
  const { sessionCode, email } = req.body;
  const requesterId = req.user.id;

  // Validate input
  if (!email || !sessionCode) {
    return res.status(400).json({ message: "Please provide email and session code" });
  }

  try {
    // Fetch session by code
    const session = await Session.findOne({ sessionCode });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Only creator can invite
    if (String(session.createdBy) !== requesterId) {
      return res
        .status(403)
        .json({ message: "Only the session creator can invite users" });
    }

    // Find user by email
    const invitedUser = await User.findOne({ email });
    if (!invitedUser) {
      return res.status(404).json({ message: "No user found with that email" });
    }

    const userId = invitedUser._id;

    // Prevent duplicate invite
    const alreadyInvited = session.invitedUsers.some(
      (u) => String(u.userId) === String(userId)
    );
    if (alreadyInvited) {
      return res
        .status(409)
        .json({ message: "User already invited to this session" });
    }

    // Add to session.invitedUsers
    session.invitedUsers.push({ userId, role: "participant" });
    await session.save();

    // Add to cart.sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $push: { sessionUsers: { userId, role: "participant" } },
    });

    res.status(200).json({
      message: `✅ ${
        invitedUser.sessionName || invitedUser.email
      } has been successfully invited to your ${session.sessionName} session`,
    });
  } catch (error) {
    console.error("❌ inviteUser error:", error);
    res.status(500).json({
      message: "Oops, something went wrong while inviting user",
    });
  }
};

exports.acceptInvite = async (req, res) => {
  const { sessionCode } = req.body;
  const userId = req.user.id;

  try {
    const session = await Session.findOne({ sessionCode });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const invited = session.invitedUsers.find(
      (u) => String(u.userId) === String(userId)
    );

    if (!invited) {
      return res.status(400).json({ message: 'You are not invited to this session' });
    }

    // Ensure participant is not already in the cart sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $addToSet: { sessionUsers: { userId, role: invited.role } },
    });

    res.status(200).json({ message: 'You have joined the session successfully' });
  } catch (error) {
    console.error('❌ acceptInvite error:', error);
    res.status(500).json({
      message: 'Oops, something went wrong while accepting invite',
    });
  }
};

exports.rejectSessionInvite = async (req, res) => {
  const userId = req.user.id;
  const { sessionCode } = req.body;

  try {
    const session = await Session.findOne({ sessionCode });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if user is actually invited
    const isInvited = session.invitedUsers.some(
      (u) => String(u.userId) === userId
    );

    if (!isInvited) {
      return res
        .status(400)
        .json({ message: "You are not invited to this session" });
    }

    // Remove from invitedUsers
    session.invitedUsers = session.invitedUsers.filter(
      (u) => String(u.userId) !== userId
    );
    await session.save();

    // Also remove from cart.sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $pull: { sessionUsers: { userId } }
    });

    res.status(200).json({ message: "You have declined the session invite" });
  } catch (error) {
    console.error("❌ rejectSessionInvite error:", error);
    res.status(500).json({ message: "Something went wrong rejecting the invite" });
  }
};

exports.joinSessionByCode = async (req, res) => {
  const userId = req.user.id;
  const { sessionCode, passcode } = req.body;

  if (!sessionCode) {
    return res.status(400).json({ message: "Session code is required" });
  }

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // If passcode is required but missing or wrong
    if (session.passcode && session.passcode !== passcode) {
      return res
        .status(403)
        .json({ message: "Incorrect or missing session passcode" });
    }

    // Check if user is already invited (participant or pending)
    const existing = session.invitedUsers.find(
      (u) => String(u.userId) === userId
    );

    if (existing) {
      return res.status(200).json({
        message:
          existing.role === "participant"
            ? "You are already a participant in this session"
            : "You have already requested to join this session",
      });
    }

    // Add user as pending
    session.invitedUsers.push({ userId, role: "pending" });
    await session.save();

    // Add to cart.sessionUsers as well
    await Cart.findByIdAndUpdate(session.cartId, {
      $addToSet: { sessionUsers: { userId, role: "participant" } }, // Optional: you can delay this until approval if needed
    });

    res.status(202).json({
      message: "Join request submitted. Awaiting session creator approval",
      sessionId: session._id,
    });
  } catch (error) {
    console.error("❌ joinSessionByCode error:", error);
    res.status(500).json({
      message: "Oops, something went wrong while joining the session",
    });
  }
};

exports.getJoinRequests = async (req, res) => {
  const { sessionCode } = req.body;
  const requesterId = req.user.id;

  if (!sessionCode) {
    return res.status(400).json({ message: "Session code is required" });
  }

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Only the session creator can view join requests
    if (String(session.createdBy) !== requesterId) {
      return res.status(403).json({ message: "Only the session creator can view join requests" });
    }

    const pendingRequests = session.invitedUsers.filter(user => user.role === "pending");

    res.status(200).json({
      sessionName: session.sessionName,
      pendingRequests
    });
  } catch (error) {
    console.error("❌ getJoinRequests error:", error);
    res.status(500).json({ message: "Something went wrong while fetching join requests" });
  }
};

exports.approveJoinRequest = async (req, res) => {
  const { sessionCode } = req.params;
  const { email } = req.body;
  const requesterId = req.user.id;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Ensure only creator can approve
    if (String(session.createdBy) !== requesterId) {
      return res.status(403).json({ message: 'Only the session creator can approve requests' });
    }

    const userToApprove = await User.findOne({ email });
    if (!userToApprove) {
      return res.status(404).json({ message: 'No user found with that email' });
    }

    // Check if user is in pending state
    const invitedEntry = session.invitedUsers.find(
      (u) => String(u.userId) === String(userToApprove._id) && u.role === 'pending'
    );

    if (!invitedEntry) {
      return res.status(400).json({ message: 'No pending request from this user' });
    }

    // Approve the request
    invitedEntry.role = 'participant';
    await session.save();

    // Reflect it in the cart
    await Cart.findByIdAndUpdate(session.cartId, {
      $push: {
        sessionUsers: {
          userId: userToApprove._id,
          role: 'participant'
        }
      }
    });

    res.status(200).json({ message: `${email} has been approved and added to the session.` });

  } catch (error) {
    console.error('❌ approveJoinRequest error:', error);
    res.status(500).json({ message: 'Something went wrong while approving the join request' });
  }
};

exports.rejectJoinRequest = async (req, res) => {
  const { sessionCode } = req.params;
  const { email } = req.body;
  const requesterId = req.user.id;

  if (!email || !sessionCode) {
    return res.status(400).json({ message: 'Missing session code or email' });
  }

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Ensure only the creator can reject
    if (String(session.createdBy) !== requesterId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const userToReject = await User.findOne({ email });
    if (!userToReject) {
      return res.status(404).json({ message: 'User not found' });
    }

    const originalCount = session.invitedUsers.length;
    session.invitedUsers = session.invitedUsers.filter(
      (u) => String(u.userId) !== String(userToReject._id)
    );

    if (session.invitedUsers.length === originalCount) {
      return res.status(404).json({ message: 'User is not in the session or already handled' });
    }

    await session.save();

    res.status(200).json({
      message: `User ${email} has been rejected from the session`
    });
  } catch (error) {
    console.error('❌ rejectJoinRequest error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMySessions = async (req, res) => {
  const userId = req.user.id;

  try {
    const sessions = await Session.find({
      "invitedUsers.userId": userId,
    })
      .sort({ updatedAt: -1 }) // Most recent first
      .populate("cartId") // Optional: get cart info
      .populate("createdBy", "name email"); // Optional: creator info

    if (!sessions || sessions.length === 0) {
      return res
        .status(200)
        .json({
          message: "You are not part of any sessions yet",
          sessions: [],
        });
    }

    res.status(200).json({
      message: `You are part of ${sessions.length} session(s)`,
      sessions,
    });
  } catch (error) {
    console.error("getMySessions error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong fetching your sessions" });
  }
};

exports.getSessionById = async (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  try {
    const session = await Session.findById(sessionId)
      .populate("createdBy", "name email")
      .populate("invitedUsers.userId", "name email")
      .populate({
        path: "cartId",
        populate: {
          path: "products.productId",
          select: "name price",
        },
      });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 🔒 Confirm requesting user is in the session
    const isInSession = session.invitedUsers.some(
      (entry) => String(entry.userId._id) === userId
    );

    if (!isInSession && String(session.createdBy._id) !== userId) {
      return res.status(403).json({ message: "Access denied to this session" });
    }

    res.status(200).json({
      message: "Session retrieved successfully",
      session,
    });
  } catch (error) {
    console.error("getSessionById error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the session" });
  }
};

exports.leaveSession = async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Prevent creator from leaving
    if (String(session.createdBy) === userId) {
      return res
        .status(403)
        .json({
          message:
            "Creators cannot leave their own sessions. You may end the session instead.",
        });
    }

    // Filter out user from invitedUsers
    session.invitedUsers = session.invitedUsers.filter(
      (entry) => String(entry.userId) !== userId
    );
    await session.save();

    // Also remove from Cart.sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $pull: { sessionUsers: { userId: userId } },
    });

    res.status(200).json({ message: "You have left the session successfully" });
  } catch (error) {
    console.error("leaveSession error:", error);
    res
      .status(500)
      .json({
        message: "Something went wrong while trying to leave the session",
      });
  }
};

exports.endSession = async (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (String(session.createdBy) !== userId) {
      return res
        .status(403)
        .json({ message: "Only the session creator can end the session" });
    }

    // Already ended?
    if (session.status === "ended") {
      return res.status(400).json({ message: "Session is already ended" });
    }

    session.status = "ended";
    await session.save();

    res.status(200).json({
      message: "Session ended successfully",
      sessionId: session._id,
    });
  } catch (error) {
    console.error("endSession error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while ending the session" });
  }
};
