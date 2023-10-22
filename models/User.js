const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    remainingMessageLimit: {
      type: Number,
      default: 20,
    },
    ip: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["normal", "gold"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

User.index({ email: 1 });
User.index({ type: 1 });
User.index({ ip: 1 });
User.index({ email: 1, remainingMessageLimit: 1 });

module.exports = mongoose.model("User", User);
