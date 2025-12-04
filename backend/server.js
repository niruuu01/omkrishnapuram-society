require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false // Disable for development, configure properly in production
}));

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/committee', require('./routes/committee'));
app.use('/api/documents', require('./routes/documents'));

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
    // For simplicity, we'll use a basic token
    // In production, use a proper CSRF library
    const token = require('crypto').randomBytes(32).toString('hex');
    res.cookie('XSRF-TOKEN', token);
    res.json({ csrfToken: token });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large' });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Unexpected file field' });
    }

    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   Omkrishnapuram Society Management System             ║
║   Server running on http://localhost:${PORT}            ║
╚════════════════════════════════════════════════════════╝

📝 API Endpoints:
   - POST   /api/auth/login
   - POST   /api/auth/logout
   - GET    /api/auth/verify
   - GET    /api/content
   - PUT    /api/content/:key
   - GET    /api/committee
   - POST   /api/committee
   - PUT    /api/committee/:id
   - DELETE /api/committee/:id
   - GET    /api/documents
   - POST   /api/documents
   - DELETE /api/documents/:id
   - GET    /api/documents/:id/download

🔐 Default Admin Credentials:
   Username: admin
   Password: admin123

⚠️  Remember to:
   1. Run 'npm run init-db' to initialize database
   2. Run 'npm run seed' to add initial data
   3. Change default password after first login
  `);
});

module.exports = app;
