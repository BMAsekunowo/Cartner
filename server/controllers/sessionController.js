const Session = require("../models/session"); //Session Model
const Cart = require("../models/cart"); //Cart Model
const User = require("../models/user"); //User Model
const mongoose = require("mongoose"); //Database

// Utility to generate readable session codes
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g. C9X2K8
};

exports.createSession = async (req, res) => {
  const { type, name, passcode } = req.body;
  const userId = req.user.id;

  if (!type || !name) {
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
      type,
      name,
      cartId: newCart._id,
      createdBy: userId,
      sessionCode,
      passcode: passcode || null,
      invitedUsers: [{ userId, role: "creator" }],
    });

    await newSession.save();

    res.status(201).json({
      message: "Session created successfully",
      session: {
        id: newSession._id,
        name: newSession.name,
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
  const { sessionId } = req.params;
  const { email } = req.body;
  const requesterId = req.user.id;

  // Validate input
  if (!email) {
    return res
      .status(400)
      .json({ message: "Please provide the email of the user to invite" });
  }

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid session ID format" });
  }

  try {
    // Fetch session
    const session = await Session.findById(sessionId);
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
        invitedUser.name || invitedUser.email
      } has been successfully invited to the session`,
    });
  } catch (error) {
    console.error("❌ inviteUser error:", error);
    res.status(500).json({
      message: "Oops, something went wrong while inviting user",
    });
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

exports.approveJoinRequest = async (req, res) => {
  const creatorId = req.user.id;
  const { sessionId, userId } = req.body;

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(sessionId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({ message: "Invalid session or user ID" });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Only the creator can approve
    if (String(session.createdBy) !== creatorId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to approve join requests" });
    }

    // Find the user in invitedUsers
    const userEntry = session.invitedUsers.find(
      (u) => String(u.userId) === userId
    );

    if (!userEntry || userEntry.role !== "pending") {
      return res
        .status(400)
        .json({
          message: "User has not requested to join or is already a participant",
        });
    }

    // Update role to participant
    userEntry.role = "participant";
    await session.save();

    // Add to cart sessionUsers (if not already added)
    await Cart.findByIdAndUpdate(session.cartId, {
      $addToSet: { sessionUsers: { userId, role: "participant" } },
    });

    res.status(200).json({ message: "User approved and added to session" });
  } catch (error) {
    console.error("approveJoinRequest error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while approving user" });
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

exports.rejectJoinRequest = async (req, res) => {
  const creatorId = req.user.id;
  const { sessionId, userId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(sessionId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({ message: "Invalid session or user ID" });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (String(session.createdBy) !== creatorId) {
      return res
        .status(403)
        .json({ message: "Only the session creator can reject join requests" });
    }

    const existing = session.invitedUsers.find(
      (entry) => String(entry.userId) === userId
    );

    if (!existing || existing.role !== "pending") {
      return res
        .status(400)
        .json({ message: "This user has no pending join request to reject" });
    }

    // Remove the user from invitedUsers[]
    session.invitedUsers = session.invitedUsers.filter(
      (entry) => String(entry.userId) !== userId
    );

    await session.save();

    res.status(200).json({ message: "Join request rejected successfully" });
  } catch (error) {
    console.error("rejectJoinRequest error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while rejecting join request" });
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
