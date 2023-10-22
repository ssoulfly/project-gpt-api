const mongoose = require("mongoose");

const RewordHistory = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rewardCoin: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

RewordHistory.index({ user: 1 });

module.exports = mongoose.model("RewordHistories", RewordHistory);
