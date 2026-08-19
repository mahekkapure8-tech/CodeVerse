const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addSubmission,
    getSubmissionHistory
} = require("../controllers/submissionController");

router.post("/add", authMiddleware, addSubmission);

router.get("/history", authMiddleware, getSubmissionHistory);

module.exports = router;