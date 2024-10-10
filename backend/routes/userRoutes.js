const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUserRegistration, validateLogin } = require('../utils/validateInput');
const { uploadAssignment, getAdmins } = require('../controllers/userController');
const { protect, isUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', validateLogin, login);
router.post('/upload', protect, isUser, uploadAssignment);
router.get('/admins', protect, getAdmins);

module.exports = router;
