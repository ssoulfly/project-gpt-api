const Conversation = require("../../models/Conversation");

module.exports.createConversation = async (userId, title) => {
  const conversation = new Conversation();
  conversation.user = userId;
  conversation.title = title;
  conversation.save();
  return conversation;
};
