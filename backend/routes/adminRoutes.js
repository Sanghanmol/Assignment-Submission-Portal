const express = require('express');
const { register, login } = require('../controllers/authController');
const { getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { validateUserRegistration, validateLogin } = require('../utils/validateInput');
const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', validateLogin, login);
router.get('/assignments', protect, isAdmin, getAssignments);
router.post('/assignments/:id/accept', protect, isAdmin, acceptAssignment);
router.post('/assignments/:id/reject', protect, isAdmin, rejectAssignment);

module.exports = router;
