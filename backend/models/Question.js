const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },

    language: {
        type: String,
        default: "JavaScript"
    },

    starterCode: {
        type: String
    },

    testCases: [
        {
            input: String,
            output: String
        }
    ],

    tags: [
        String
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);