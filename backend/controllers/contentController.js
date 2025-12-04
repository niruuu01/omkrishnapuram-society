const { query, queryOne, run } = require('../database/db');

const getAllContent = (req, res) => {
    try {
        const content = query('SELECT key, value, updated_at FROM content');

        // Convert to key-value object
        const contentObj = {};
        content.forEach(item => {
            contentObj[item.key] = {
                value: item.value,
                updated_at: item.updated_at
            };
        });

        res.json({ success: true, content: contentObj });
    } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateContent = (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;

        if (!value) {
            return res.status(400).json({ error: 'Value is required' });
        }

        // Check if key exists
        const existing = queryOne('SELECT id FROM content WHERE key = ?', [key]);

        if (existing) {
            // Update existing
            run(
                'UPDATE content SET value = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE key = ?',
                [value, req.user.id, key]
            );
        } else {
            // Insert new
            run(
                'INSERT INTO content (key, value, updated_by) VALUES (?, ?, ?)',
                [key, value, req.user.id]
            );
        }

        res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        console.error('Update content error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteContent = (req, res) => {
    try {
        const { key } = req.params;

        run('DELETE FROM content WHERE key = ?', [key]);

        res.json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Delete content error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllContent,
    updateContent,
    deleteContent
};
