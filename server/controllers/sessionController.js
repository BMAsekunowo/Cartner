const Session = require("../models/session"); //Session Model
const Cart = require("../models/cart"); //Cart Model
const User = require("../models/user"); //User Model
const mongoose = require("mongoose"); //Database
const {
  sendSessionCreationEmail,
  sendInviteUserEmail,
  sendAcceptInviteEmail,
  sendRejectInviteEmail,
  sendSessionJoinRequestEmail,
  sendJoinReqApprovedEmail,
  sendRejectJoinReqEmail,
  sendSessionEndedEmail,
} = require("../utils/email/sendNotificationsEmail"); //Email utility

// Utility to generate readable session codes
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g. C9X2K8
};

exports.createSession = async (req, res) => {
  const { sessionType, sessionName, passcode, participants } = req.body;
  const userId = req.user.id;

  if (!sessionType || !sessionName) {
    return res.status(400).json({
      message: "Session type and name are required",
    });
  }

  try {
    // Check if user already has a session with same name
    const existingSession = await Session.findOne({
      sessionName,
      createdBy: userId,
    });

    if (existingSession) {
      return res.status(409).json({
        message:
          "You already have a session with this name. Please choose a different name.",
      });
    }

    // Step 1: Create cart
    const newCart = await Cart.create({
      userId,
      sessionUsers: [{ userId, role: "creator" }],
      products: [],
      totalPrice: 0,
    });

    // Step 2: Generate session code
    const sessionCode = generateCode();

    // Step 3: Create session
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
    await sendSessionCreationEmail(
      req.user.email,
      req.user.name,
      sessionName,
      sessionCode,
    );

    // Step 4: Link sessionId to cart
    newCart.sessionId = newSession._id;
    await newCart.save();

    // Step 5: Respond
    return res.status(201).json({
      message: "Session created successfully",
      session: {
        id: newSession._id,
        name: newSession.sessionName,
        sessionCode: newSession.sessionCode,
        passcodeRequired: !!newSession.passcode,
      },
    });
  } catch (error) {
    // Handle duplicate key error from index, just in case
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A session with this name already exists under your account.",
      });
    }

    console.error("createSession error:", error);
    return res.status(500).json({
      message: "Something went wrong while creating the session",
    });
  }
};

exports.inviteUser = async (req, res) => {
  const { sessionCode, email } = req.body;
  const requesterId = req.user.id;

  // Validate input
  if (!email || !sessionCode) {
    return res
      .status(400)
      .json({ message: "Please provide email and session code" });
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
      (u) => String(u.userId) === String(userId),
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

    // Send invitation email
    await sendInviteUserEmail(
      email,
      req.user.name, // inviter name from logged-in user
      session.sessionName,
    );

    res.status(200).json({
      message: `✅ ${
        invitedUser.sessionName || invitedUser.email
      } has been successfully invited to your ${session.sessionName} session`,
    });
  } catch (error) {
    console.error("  inviteUser error:", error);
    res.status(500).json({
      message: "Oops, something went wrong while inviting user",
    });
  }
};

exports.getInvitesByEmail = async (req, res) => {
  const userEmail = req.user.email;

  try {
    const sessions = await Session.find({
      invitedUsers: { $elemMatch: { email: userEmail, role: "pending" } },
    }).select("sessionName sessionCode invitedUsers creator");

    const pendingInvites = sessions.map((session) => {
      const invite = session.invitedUsers.find(
        (u) => u.email === userEmail && u.role === "pending",
      );

      return {
        sessionName: session.sessionName,
        sessionCode: session.sessionCode,
        invitedBy: session.creator,
      };
    });

    res.status(200).json(pendingInvites);
  } catch (error) {
    console.error("  getInvitesByEmail error:", error);
    res.status(500).json({
      message: "Something went wrong while fetching invites by email",
    });
  }
};

exports.acceptInvite = async (req, res) => {
  const { sessionCode } = req.body;
  const userId = req.user.id;

  try {
    const session = await Session.findOne({ sessionCode }).populate(
      "createdBy",
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const invited = session.invitedUsers.find(
      (u) => String(u.userId) === String(userId),
    );

    if (!invited) {
      return res
        .status(400)
        .json({ message: "You are not invited to this session" });
    }

    // Ensure participant is not already in the cart sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $addToSet: { sessionUsers: { userId, role: invited.role } },
    });

    // Send acceptance email to creator
    await sendAcceptInviteEmail(
      session.createdBy.email,
      req.user.name,
      session.sessionName,
    );

    res.status(200).json({
      message: "You have joined the session successfully",
      sessionId: session._id,
    });
  } catch (error) {
    console.error("  acceptInvite error:", error);
    res.status(500).json({
      message: "Oops, something went wrong while accepting invite",
    });
  }
};

exports.rejectSessionInvite = async (req, res) => {
  const userId = req.user.id;
  const { sessionCode } = req.body;

  try {
    const session = await Session.findOne({ sessionCode }).populate(
      "createdBy",
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if user is actually invited
    const isInvited = session.invitedUsers.some(
      (u) => String(u.userId) === userId,
    );

    if (!isInvited) {
      return res
        .status(400)
        .json({ message: "You are not invited to this session" });
    }

    // Remove from invitedUsers
    session.invitedUsers = session.invitedUsers.filter(
      (u) => String(u.userId) !== userId,
    );
    await session.save();

    // Also remove from cart.sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $pull: { sessionUsers: { userId } },
    });

    // Send rejection email to creator
    await sendRejectInviteEmail(
      session.createdBy.email,
      req.user.name,
      session.sessionName,
    );

    res.status(200).json({ message: "You have declined the session invite" });
  } catch (error) {
    console.error("  rejectSessionInvite error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong rejecting the invite" });
  }
};

exports.joinSessionByCode = async (req, res) => {
  const userId = req.user.id;
  const sessionCode = req.body.sessionCode || req.body.joinSessionCode;
  const passcode = req.body.passcode || req.body.joinPasscode;

  console.log("🔐 Received join request:", { sessionCode, passcode });

  if (!sessionCode) {
    return res.status(400).json({ message: "Session code is required" });
  }

  try {
    const session = await Session.findOne({ sessionCode }).populate(
      "createdBy",
    );
    console.log("📦 Session fetched:", session);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.passcode && session.passcode !== passcode) {
      return res
        .status(403)
        .json({ message: "Incorrect or missing session passcode" });
    }

    const existing = session.invitedUsers.find(
      (u) => String(u.userId) === userId,
    );

    if (existing) {
      return res.status(200).json({
        message:
          existing.role === "pending"
            ? "You are already a participant in this session"
            : "You have already requested to join this session",
      });
    }

    console.log("📌 User is new, updating invitedUsers and cart...");

    // Add to invitedUsers as pending
    await Session.updateOne(
      { _id: session._id },
      { $addToSet: { invitedUsers: { userId, role: "pending" } } },
    );

    // Add to sessionUsers in cart
    await Cart.updateOne(
      { _id: session.cartId },
      { $addToSet: { sessionUsers: { userId, role: "participant" } } },
    );

    // 🔔 Send email to session creator
    await sendSessionJoinRequestEmail(
      session.createdBy.email,
      req.user.name,
      session.sessionName,
    );

    res.status(202).json({
      message: "Join request submitted. Awaiting session creator approval",
      sessionId: session._id,
    });
  } catch (error) {
    console.error("  joinSessionByCode error:", error);
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
      return res
        .status(403)
        .json({ message: "Only the session creator can view join requests" });
    }

    const pendingRequests = session.invitedUsers.filter(
      (user) => user.role === "pending",
    );

    if (pendingRequests.length === 0) {
      return res
        .status(200)
        .json({ message: "No pending join requests for this session" });
    } else {
      return res.status(200).json({
        sessionName: session.sessionName,
        message: `Found ${pendingRequests.length} pending join request(s)`,
        pendingRequests,
      });
    }
  } catch (error) {
    console.error("  getJoinRequests error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching join requests" });
  }
};

exports.approveJoinRequest = async (req, res) => {
  const { sessionCode } = req.params;
  const { email } = req.body;
  const requesterId = req.user.id;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (String(session.createdBy) !== requesterId) {
      return res
        .status(403)
        .json({ message: "Only the session creator can approve requests" });
    }

    const userToApprove = await User.findOne({ email });
    if (!userToApprove) {
      return res.status(404).json({ message: "No user found with that email" });
    }

    const invitedEntry = session.invitedUsers.find(
      (u) =>
        String(u.userId) === String(userToApprove._id) && u.role === "pending",
    );

    if (!invitedEntry) {
      return res
        .status(400)
        .json({ message: "No pending request from this user" });
    }

    invitedEntry.role = "participant";
    await session.save();

    await Cart.findByIdAndUpdate(session.cartId, {
      $push: {
        sessionUsers: {
          userId: userToApprove._id,
          role: "participant",
        },
      },
    });

    // 🔔 Notify approved user
    await sendJoinReqApprovedEmail(
      userToApprove.email,
      session.sessionName,
      req.user.name,
    );

    res.status(200).json({
      message: `${email} has been approved and added to the session.`,
    });
  } catch (error) {
    console.error("approveJoinRequest error:", error);
    res.status(500).json({
      message: "Something went wrong while approving the join request",
    });
  }
};

exports.rejectJoinRequest = async (req, res) => {
  const { sessionCode } = req.params;
  const { email } = req.body;
  const requesterId = req.user.id;

  if (!email || !sessionCode) {
    return res.status(400).json({ message: "Missing session code or email" });
  }

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (String(session.createdBy) !== requesterId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const userToReject = await User.findOne({ email });
    if (!userToReject) {
      return res.status(404).json({ message: "User not found" });
    }

    const originalCount = session.invitedUsers.length;
    session.invitedUsers = session.invitedUsers.filter(
      (u) => String(u.userId) !== String(userToReject._id),
    );

    if (session.invitedUsers.length === originalCount) {
      return res
        .status(404)
        .json({ message: "User is not in the session or already handled" });
    }

    await session.save();

    // 🔔 Notify rejected user
    await sendRejectJoinReqEmail(
      userToReject.email,
      session.sessionName,
      req.user.name,
    );

    res.status(200).json({
      message: `User ${email} has been rejected from the session`,
    });
  } catch (error) {
    console.error("rejectJoinRequest error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMySessions = async (req, res) => {
  const userId = req.user.id;

  try {
    const sessions = await Session.find({
      invitedUsers: {
        $elemMatch: {
          userId: userId,
          role: { $in: ["creator", "participant"] }, // Exclude 'pending'
        },
      },
    })
      .sort({ updatedAt: -1 })
      .populate("cartId")
      .populate("createdBy", "name email");

    if (!sessions || sessions.length === 0) {
      return res.status(200).json({
        message: "You are not part of any active sessions yet",
        sessions: [],
      });
    }

    res.status(200).json({
      message: `You are part of ${sessions.length} session(s)`,
      sessions,
    });
  } catch (error) {
    console.error("getMySessions error:", error);
    res.status(500).json({
      message: "Something went wrong fetching your sessions",
    });
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
      (entry) => String(entry.userId._id) === userId,
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

exports.getActiveSessionsByUser = async (req, res) => {
  console.log("💡 Incoming request to /my-actives");
  console.log("🔐 req.user:", req.user);

  try {
    const userId = req.user.id;
    const objectUserId = new mongoose.Types.ObjectId(userId);

    const sessions = await Session.find({
      status: "active",
      $or: [
        { createdBy: objectUserId },
        {
          invitedUsers: {
            $elemMatch: {
              userId: objectUserId,
              role: "participant",
            },
          },
        },
      ],
    })
      .sort({ updatedAt: -1 })
      .populate("cartId");

    console.log("✅ Sessions found:", sessions.length);

    res.status(200).json({
      message: `Found ${sessions.length} active session(s) for user`,
      sessions,
    });
  } catch (error) {
    console.error("  getActiveSessionsByUser error:", error);
    res.status(500).json({
      message: "Something went wrong while fetching your active sessions",
    });
  }
};

exports.getCartById = async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // ✅ Check if user is part of invitedUsers (creator or participant)
    const isInvited = session.invitedUsers.some(
      (user) => String(user.userId) === userId,
    );

    if (!isInvited && String(session.createdBy) !== userId) {
      return res.status(403).json({ message: "Access denied to this cart" });
    }

    const cart = await Cart.findById(session.cartId).populate(
      "products.productId",
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    console.error("getCartById error:", error);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

exports.getSessionSummary = async (req, res) => {
  const { sessionId } = req.params;

  // ✅ Validate sessionId
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid or missing sessionId." });
  }

  try {
    // ✅ Fetch session with invited users
    const session = await Session.findById(sessionId)
      .populate("invitedUsers.userId", "name email")
      .lean();

    // ✅ Fetch cart linked to the session
    const cart = await Cart.findOne({ sessionId })
      .populate("products.productId", "name price imageUrl")
      .populate("userId", "name") // For fallback addedBy
      .lean();

    if (!session || !cart) {
      return res.status(404).json({ message: "Session or cart not found" });
    }

    const response = {
      sessionName: session.sessionName,
      participants: session.invitedUsers.map((u) => ({
        _id: u.userId._id,
        name: u.userId.name,
      })),
      cartItems: cart.products.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        addedBy: cart.userId?.name || "Unknown", // fallback until addedBy is per-product
      })),
    };

    res.json(response);
  } catch (err) {
    console.error("❌ getSessionSummary error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.leaveSession = async (req, res) => {
  const userId = req.user.id;
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  try {
    const session = await Session.findById(sessionId).populate(
      "invitedUsers.userId",
    );
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Prevent creator from leaving
    if (String(session.createdBy) === userId) {
      return res.status(403).json({
        message:
          "Creators cannot leave their own sessions. You may end the session instead.",
      });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const sessionName = session.sessionName;
    const leaverName = user.name || user.email;

    // Filter out user from invitedUsers
    session.invitedUsers = session.invitedUsers.filter(
      (entry) => String(entry.userId._id) !== userId,
    );
    await session.save();

    // Also remove from Cart.sessionUsers
    await Cart.findByIdAndUpdate(session.cartId, {
      $pull: { sessionUsers: { userId: userId } },
    });

    // Notify all remaining participants
    const recipients = session.invitedUsers.map((entry) => entry.userId.email);
    for (const email of recipients) {
      await sendLeaveSessionEmail(email, leaverName, sessionName);
    }

    res.status(200).json({ message: "You have left the session successfully" });
  } catch (error) {
    console.error("leaveSession error:", error);
    res.status(500).json({
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

    if (session.status === "ended") {
      return res.status(400).json({ message: "Session is already ended" });
    }

    session.status = "ended";
    await Cart.findOneAndDelete({ sessionId: session._id });
    await session.save();

    // 🔔 Notify all users (creator + invited)
    const allUserIds = session.invitedUsers.map((u) => u.userId);
    const allUsers = await User.find({ _id: { $in: allUserIds } });

    const notifyEmails = allUsers.map((u) => u.email);
    const creatorName = req.user.name || "The session creator";

    for (let email of notifyEmails) {
      await sendSessionEndedEmail(email, session.sessionName, creatorName);
    }

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

//Sync User Sessions
exports.syncUserSessions = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "Invalid or missing user from token" });
    }

    const userId = req.user.id;

    const sessions = await Session.find({ "invitedUsers.userId": userId })
      .select("_id sessionName updatedAt")
      .sort({ updatedAt: -1 })
      .lean();

    const sessionSummaries = await Promise.all(
      sessions.map(async (session) => {
        const cart = await Cart.findOne({ sessionId: session._id })
          .select("totalPrice updatedAt")
          .lean();

        return {
          ...session,
          totalPrice: cart?.totalPrice || 0,
          lastCartUpdate: cart?.updatedAt || null,
        };
      }),
    );

    res.json({ sessions: sessionSummaries });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ message: "Failed to sync sessions." });
  }
};
