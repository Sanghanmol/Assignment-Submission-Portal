const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes
exports.protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token is invalid' });
    }
};

// Role-based protection
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
};

exports.isUser = (req, res, next) => {
    if (req.user.role !== 'User') {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
};
