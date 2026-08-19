const LoginHistory = require("../models/LoginHistory");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (err) {

        console.error("REGISTER ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


// ================= LOGIN =================

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // Create login history
        const loginHistory = await LoginHistory.create({
            userId: user._id,
            email: user.email,
            loginTime: new Date()
        });

        console.log(
            "LOGIN HISTORY CREATED:",
            loginHistory._id
        );

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                loginHistoryId: loginHistory._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({

            message: "Login Successful",

            token
        });

    } catch (err) {

        console.error("LOGIN ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


// ================= LOGOUT =================

const logoutUser = async (req, res) => {
    try {

        const { loginHistoryId } = req.user;

        if (!loginHistoryId) {
            return res.status(400).json({
                message: "Login session not found"
            });
        }

        const loginHistory =
            await LoginHistory.findById(loginHistoryId);

        if (!loginHistory) {
            return res.status(404).json({
                message: "Login history not found"
            });
        }

        const logoutTime = new Date();

        const duration =
            (logoutTime - loginHistory.loginTime) / 60000;

        loginHistory.logoutTime = logoutTime;

        loginHistory.sessionDuration =
            Math.round(duration);

        await loginHistory.save();

        res.status(200).json({

            message: "Logout Successful",

            sessionDuration:
                loginHistory.sessionDuration
        });

    } catch (err) {

        console.error("LOGOUT ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


// ================= EXPORT =================

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};