const Message = require("../../models/Message");
const User = require("../../models/User");
const Conversation = require("../../models/Conversation");
const { createConversation } = require("./createConversation");
const { getById } = require("./getById");
const {
  createConversationTitle,
} = require("../gpt-api/createConversationTitle");
const { createGPTMessage } = require("../gpt-api/createGPTMessage");
const mongoose = require("mongoose");

module.exports.createConversationMessage = async (
  conversationId,
  userId,
  content
) => {
  const user = await User.findOne({ _id: userId });
  if(user.remainingMessageLimit < 1){
    throw new Error({
      error: true,
      message: "Yeterli bakiyeniz bulunmuyor."
    })
  };
  
  let conversation = null;
  if(conversationId) conversation = await Conversation.findOne({ _id: conversationId })
  if (!conversationId) {
    const title = await createConversationTitle(content);
    conversation = await createConversation(userId, title);
  }
  let messages = [];
  if (conversation) messages = await Message.find({ conversation: conversation._id }).limit(50);
  
  const userMessage = new Message({
    conversation:  conversation._id,
    role: "user",
    content,
  });
  const response = await createGPTMessage(
    [...messages, userMessage].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))
  );
  const assistantMessage = new Message({
    conversation: conversation._id,
    role: "assistant",
    content: response.content,
  });
  
  user.remainingMessageLimit--;
  conversation.updatedAt = new Date()
  
  conversation.save();
  userMessage.save();
  assistantMessage.save();
  user.save();
  return assistantMessage;
};
