const Message = require("../../models/Message");

module.exports.getConversationMessages = async (conversationId) => {
  const messages = await Message.find({ conversation: conversationId });
  return messages;
};
