const express = require('express');
const router = express.Router();
const {
    getAllDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument
} = require('../controllers/documentController');
const { authenticateToken } = require('../middleware/auth');
const { uploadDocument: uploadMiddleware } = require('../middleware/upload');

// GET /api/documents - Public
router.get('/', getAllDocuments);

// POST /api/documents - Admin only
router.post('/', authenticateToken, uploadMiddleware.single('file'), uploadDocument);

// DELETE /api/documents/:id - Admin only
router.delete('/:id', authenticateToken, deleteDocument);

// GET /api/documents/:id/download - Public
router.get('/:id/download', downloadDocument);

module.exports = router;
