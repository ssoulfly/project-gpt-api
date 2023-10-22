const mongoose = require("mongoose");

const Conversation = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

Conversation.index({ "user": 1 })

module.exports = mongoose.model("Conversation", Conversation);
