const Conversation = require("../../models/Conversation");

module.exports.getUserConversation = async (userId) => {
  const conversations = await Conversation.find({ user: userId }).sort({ updatedAt: -1 });
  return conversations;
};
