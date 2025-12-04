const { query, queryOne, run } = require('../database/db');
const fs = require('fs');
const path = require('path');

const getAllMembers = (req, res) => {
    try {
        const members = query(
            'SELECT * FROM committee_members ORDER BY category, display_order'
        );

        // Group by category
        const grouped = {
            executive: members.filter(m => m.category === 'executive'),
            managing: members.filter(m => m.category === 'managing')
        };

        res.json({ success: true, members: grouped });
    } catch (error) {
        console.error('Get members error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMemberById = (req, res) => {
    try {
        const { id } = req.params;
        const member = queryOne('SELECT * FROM committee_members WHERE id = ?', [id]);

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json({ success: true, member });
    } catch (error) {
        console.error('Get member error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createMember = (req, res) => {
    try {
        const { name, position, email, phone, bio, badge, initials, category } = req.body;

        if (!name || !position || !category) {
            return res.status(400).json({ error: 'Name, position, and category are required' });
        }

        if (!['executive', 'managing'].includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        // Get max display_order for category
        const maxOrder = queryOne(
            'SELECT MAX(display_order) as max_order FROM committee_members WHERE category = ?',
            [category]
        );
        const displayOrder = (maxOrder?.max_order || 0) + 1;

        // Handle photo upload
        let photoUrl = null;
        if (req.file) {
            photoUrl = `/uploads/photos/${req.file.filename}`;
        }

        const result = run(
            `INSERT INTO committee_members 
       (name, position, email, phone, bio, badge, initials, category, display_order, photo_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, position, email || null, phone || null, bio || null, badge || null, initials || null, category, displayOrder, photoUrl]
        );

        res.json({
            success: true,
            message: 'Member created successfully',
            member: { id: result.lastInsertRowid }
        });
    } catch (error) {
        console.error('Create member error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateMember = (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, email, phone, bio, badge, initials, category, display_order } = req.body;

        // Check if member exists
        const existing = queryOne('SELECT * FROM committee_members WHERE id = ?', [id]);
        if (!existing) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Handle photo upload
        let photoUrl = existing.photo_url;
        if (req.file) {
            // Delete old photo if exists
            if (existing.photo_url) {
                const oldPhotoPath = path.join(__dirname, '..', existing.photo_url);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            photoUrl = `/uploads/photos/${req.file.filename}`;
        }

        run(
            `UPDATE committee_members 
       SET name = ?, position = ?, email = ?, phone = ?, bio = ?, badge = ?, 
           initials = ?, category = ?, display_order = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
            [
                name || existing.name,
                position || existing.position,
                email || existing.email,
                phone || existing.phone,
                bio || existing.bio,
                badge || existing.badge,
                initials || existing.initials,
                category || existing.category,
                display_order !== undefined ? display_order : existing.display_order,
                photoUrl,
                id
            ]
        );

        res.json({ success: true, message: 'Member updated successfully' });
    } catch (error) {
        console.error('Update member error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteMember = (req, res) => {
    try {
        const { id } = req.params;

        // Get member to delete photo
        const member = queryOne('SELECT photo_url FROM committee_members WHERE id = ?', [id]);

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Delete photo if exists
        if (member.photo_url) {
            const photoPath = path.join(__dirname, '..', member.photo_url);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        run('DELETE FROM committee_members WHERE id = ?', [id]);

        res.json({ success: true, message: 'Member deleted successfully' });
    } catch (error) {
        console.error('Delete member error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};
