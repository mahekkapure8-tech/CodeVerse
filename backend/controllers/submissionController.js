const Submission = require("../models/Submission");
const addSubmission = async (req, res) => {

    try {

        const {
            questionId,
            userId,
            code,
            language,
            status,
            passedTests,
            totalTests
        } = req.body;

        console.log("SUBMISSION REQUEST:", req.body);

        const submission = await Submission.create({
            questionId,
            userId,
            code,
            language,
            status,
            passedTests,
            totalTests
        });

        res.status(201).json({
            success: true,
            message: "Submission saved successfully",
            submission
        });

    } catch (error) {

        console.error("SUBMISSION ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};

const getSubmissions = async (req, res) => {

    try {

        const submissions = await Submission.find()
            .populate("questionId", "title")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            submissions
        });

    } catch (error) {

        console.error("GET SUBMISSIONS ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};


module.exports = {
    addSubmission,
    getSubmissions
};