const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },

    code: {
      type: String,
      required: true
    },

    language: {
      type: String,
      default: "JavaScript"
    },

    status: {
      type: String,
      enum: ["Accepted", "Failed"],
      required: true
    },

    passedTests: {
      type: Number,
      default: 0
    },

    totalTests: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Submission", submissionSchema);