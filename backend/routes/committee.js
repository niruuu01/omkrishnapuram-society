const express = require('express');
const router = express.Router();
const {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} = require('../controllers/committeeController');
const { authenticateToken } = require('../middleware/auth');
const { uploadPhoto } = require('../middleware/upload');

// GET /api/committee - Public
router.get('/', getAllMembers);

// GET /api/committee/:id - Public
router.get('/:id', getMemberById);

// POST /api/committee - Admin only
router.post('/', authenticateToken, uploadPhoto.single('photo'), createMember);

// PUT /api/committee/:id - Admin only
router.put('/:id', authenticateToken, uploadPhoto.single('photo'), updateMember);

// DELETE /api/committee/:id - Admin only
router.delete('/:id', authenticateToken, deleteMember);

module.exports = router;
