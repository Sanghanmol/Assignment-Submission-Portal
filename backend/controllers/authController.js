const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const allowedRoles = ['Admin', 'User'];

// Register function
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate input
        if (!username || !email || !password || !role) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Validate role
        if (!allowedRoles.includes(role)) {
            return res.status(400).send({
                success: false,
                message: "Invalid role. Allowed roles are 'Admin' and 'User'",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        const user = new userModel({
            username,
            email,
            password: hashedPassword,
            role,
        });
        await user.save();

        return res.status(201).send({
            success: true,
            message: "New user created successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide both email and password",
            });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // Trim the input password
        const trimmedPassword = password.trim();

        // Compare passwords
        const isMatch = await bcrypt.compare(trimmedPassword, user.password);
        console.log("Password match:", isMatch);
        console.log("Raw Password:", trimmedPassword);
        console.log("Hashed Password from DB:", user.password);
        console.log("Length of Raw Password:", trimmedPassword.length);
        console.log("Length of Hashed Password from DB:", user.password.length);

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};
