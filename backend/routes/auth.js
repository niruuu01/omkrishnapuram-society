const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, logout, verify, changePassword } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Rate limiting for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 attempts (increased for testing)
    message: 'Too many login attempts, please try again later'
});

// POST /api/auth/login
router.post('/login', loginLimiter, login);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/verify
router.get('/verify', authenticateToken, verify);

// POST /api/auth/change-password
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
