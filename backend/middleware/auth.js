const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

const optionalAuth = (req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
        } catch (error) {
            // Token invalid, but continue as unauthenticated
            req.user = null;
        }
    }

    next();
};

module.exports = {
    authenticateToken,
    optionalAuth
};
