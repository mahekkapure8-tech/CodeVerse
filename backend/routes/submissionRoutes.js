const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addSubmission
} = require("../controllers/submissionController");

router.post("/add", authMiddleware, addSubmission);

router.get("/history", authMiddleware, async (req, res) => {
    try {
        const Submission = require("../models/Submission");

        const submissions = await Submission.find({
            userId: req.user.id
        })
        .populate("questionId", "title difficulty")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            submissions
        });

    } catch (error) {
        console.error("HISTORY ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;