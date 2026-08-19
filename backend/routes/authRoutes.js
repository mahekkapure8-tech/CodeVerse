const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your profile",
        user: req.user
    });
});

module.exports = router;