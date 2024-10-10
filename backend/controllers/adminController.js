const Assignment = require('../models/assignmentModel');

// Get assignments for a specific admin
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ admin: req.user.id }).populate('userId', 'username').exec();
        res.status(200).json({ success: true, data: assignments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Accepted' }, { new: true });
        res.status(200).json({ success: true, data: assignment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
        res.status(200).json({ success: true, data: assignment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
