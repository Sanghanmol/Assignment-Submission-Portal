const Assignment = require('../models/assignmentModel');
const User = require('../models/userModel');

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    try {
        const assignment = await Assignment.create({ userId: req.user.id, task, admin: adminId });
        res.status(201).json({ success: true, data: assignment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all Admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }).select('username');
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
