const express = require('express');
const router = express.Router();
const {createSession, inviteUser, acceptInvite, joinSessionByCode, getJoinRequests, rejectSessionInvite, approveJoinRequest, rejectJoinRequest, getMySessions, getSessionById, leaveSession, endSession} = require('../controllers/sessionController');
const protect = require('../middleware/authMiddleware');

//Create a new session (auto-generates cart, code, etc.)
router.post('/', protect, createSession);

//Invite a user to a session (creator only)
router.post('/invite', protect, inviteUser);

//Accept a session invite (user only)
router.post('/accinvite', protect, acceptInvite);

//Reject a session invite (user only)
router.post('/rejinvite', protect, rejectSessionInvite);

//Join session using sessionCode (and optional passcode)
router.post('/join/code', protect, joinSessionByCode);

//Get all join requests for a session (creator only)
router.post('/joinrequests', protect, getJoinRequests);

//Approve a user's join request (creator only)
router.post('/approve/:sessionCode', protect, approveJoinRequest);

//Reject a user's join request (creator only)
router.post('/reject/:sessionCode', protect, rejectJoinRequest);

//Leave a session (participant or pending only)
router.delete('/:sessionId/leave', protect, leaveSession);

//End a session (creator only — sets status to 'ended')
router.put('/:sessionId/end', protect, endSession);

//Get all sessions the logged-in user is involved in
router.get('/my', protect, getMySessions);

//Get full details of a specific session by ID
router.get('/:sessionId', protect, getSessionById);

module.exports = router;