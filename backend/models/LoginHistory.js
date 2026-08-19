const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    email: {
      type: String,
      required: true
    },

    loginTime: {
      type: Date,
      required: true
    },

    logoutTime: {
      type: Date,
      default: null
    },

    sessionDuration: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "LoginHistory",
  loginHistorySchema
);