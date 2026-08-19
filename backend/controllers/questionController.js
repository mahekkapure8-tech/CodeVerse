const Question = require("../models/Question");

// Add Question
const addQuestion = async (req, res) => {

    try {

        const question = new Question(req.body);

        await question.save();

        res.status(201).json({
            message: "Question Added Successfully",
            question
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
// Get All Questions

const getAllQuestions = async (req, res) => {

    try {

        const questions = await Question.find();

        res.status(200).json(questions);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const getQuestionById = async (req, res) => {

    try {

        const question = await Question.findById(req.params.id);

        if (!question) {

            return res.status(404).json({
                message: "Question Not Found"
            });

        }

        res.status(200).json(question);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const updateQuestion = async (req, res) => {

    try {

        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!question) {

            return res.status(404).json({
                message: "Question Not Found"
            });

        }

        res.status(200).json({
            message: "Question Updated Successfully",
            question
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const deleteQuestion = async (req, res) => {

    try {

        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {

            return res.status(404).json({
                message: "Question Not Found"
            });

        }

        res.status(200).json({
            message: "Question Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};