const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ["assistant", "user"]
  },
  content: {
    type: String,
    required: true    
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
}, { timestamps: true, toJSON: { virtuals: true } });

Message.index({ "conversation.user": 1 })

module.exports = mongoose.model("Message", Message);
