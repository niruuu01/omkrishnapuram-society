const { query, queryOne, run } = require('../database/db');
const fs = require('fs');
const path = require('path');

const getAllDocuments = (req, res) => {
    try {
        const { category } = req.query;

        let sql = 'SELECT * FROM documents ORDER BY uploaded_at DESC';
        let params = [];

        if (category) {
            sql = 'SELECT * FROM documents WHERE category = ? ORDER BY uploaded_at DESC';
            params = [category];
        }

        const documents = query(sql, params);

        res.json({ success: true, documents });
    } catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const uploadDocument = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { title, description, category } = req.body;

        if (!title || !category) {
            // Delete uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Title and category are required' });
        }

        if (!['notices', 'reports', 'drawings', 'approvals'].includes(category)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Invalid category' });
        }

        const filePath = `/uploads/documents/${req.file.filename}`;

        const result = run(
            `INSERT INTO documents 
       (title, description, category, file_name, file_path, file_size, mime_type, uploaded_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description || null,
                category,
                req.file.originalname,
                filePath,
                req.file.size,
                req.file.mimetype,
                req.user.id
            ]
        );

        res.json({
            success: true,
            message: 'Document uploaded successfully',
            document: {
                id: result.lastInsertRowid,
                title,
                file_name: req.file.originalname,
                file_path: filePath
            }
        });
    } catch (error) {
        console.error('Upload document error:', error);
        // Clean up file if error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteDocument = (req, res) => {
    try {
        const { id } = req.params;

        // Get document to delete file
        const document = queryOne('SELECT file_path FROM documents WHERE id = ?', [id]);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Delete file
        const filePath = path.join(__dirname, '..', document.file_path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from database
        run('DELETE FROM documents WHERE id = ?', [id]);

        res.json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const downloadDocument = (req, res) => {
    try {
        const { id } = req.params;

        const document = queryOne('SELECT * FROM documents WHERE id = ?', [id]);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const filePath = path.join(__dirname, '..', document.file_path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        res.download(filePath, document.file_name);
    } catch (error) {
        console.error('Download document error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument
};
