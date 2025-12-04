const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Document } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Get all documents
router.get('/', async (req, res) => {
    try {
        const documents = await Document.findAll({ order: [['uploadDate', 'DESC']] });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload document (protected)
router.post('/', verifyToken, upload.single('file'), async (req, res) => {
    try {
        const { title, type, description } = req.body;
        const filename = req.file.filename;
        const document = await Document.create({ title, type, filename, description });
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete document (protected)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        // Delete file from filesystem
        const filePath = path.join(__dirname, '../uploads', document.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await document.destroy();
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
