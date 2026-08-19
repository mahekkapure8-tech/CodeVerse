const Question = require("../models/Question");
const Submission = require("../models/Submission");

const getDashboard = async (req, res) => {

    try {

        const totalQuestions = await Question.countDocuments();

const totalSubmissions = await Submission.countDocuments({
    userId: req.user.id
});
        // Count UNIQUE questions that have been solved
        const solvedQuestionIds = await Submission.distinct("questionId", {
    userId: req.user.id,
    status: "Accepted"
});

        const solvedQuestions = solvedQuestionIds.length;

        const successRate =
            totalSubmissions === 0
                ? 0
                : Math.round(
                    (solvedQuestions / totalSubmissions) * 100
                );

        res.json({
            success: true,
            totalQuestions,
            solvedQuestions,
            totalSubmissions,
            successRate
        });

    } catch (error) {

        console.error("DASHBOARD ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

module.exports = {
    getDashboard
};