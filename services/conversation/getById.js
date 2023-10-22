const Conversation = require("../../models/Conversation");

module.exports.getById = async (conversationId) => {
  return await Conversation.findOne({ _id: conversationId });
};
