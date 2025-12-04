const express = require('express');
const router = express.Router();
const { getAllContent, updateContent, deleteContent } = require('../controllers/contentController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/content - Public
router.get('/', getAllContent);

// PUT /api/content/:key - Admin only
router.put('/:key', authenticateToken, updateContent);

// DELETE /api/content/:key - Admin only
router.delete('/:key', authenticateToken, deleteContent);

module.exports = router;
