const express = require('express');
const router = express.Router();
const {createSession, inviteUser, joinSessionByCode, approveJoinRequest, getMySessions, getSessionById, leaveSession, rejectJoinRequest, endSession} = require('../controllers/sessionController');
const protect = require('../middleware/authMiddleware');

//Create a new session (auto-generates cart, code, etc.)
router.post('/', protect, createSession);


//Join session using sessionCode (and optional passcode)
router.post('/join/code', protect, joinSessionByCode);


//Approve a user's join request (creator only)
router.post('/approve', protect, approveJoinRequest);


//Reject a user's join request (creator only)
router.post('/reject', protect, rejectJoinRequest);


//Leave a session (participant or pending only)
router.delete('/:sessionId/leave', protect, leaveSession);


//End a session (creator only — sets status to 'ended')
router.put('/:sessionId/end', protect, endSession);


//Get all sessions the logged-in user is involved in
router.get('/my', protect, getMySessions);


//Get full details of a specific session by ID
router.get('/:sessionId', protect, getSessionById);

module.exports = router;