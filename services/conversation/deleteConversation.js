const Conversation = require("../../models/Conversation");

module.exports.deleteConversation = async (_id) => {
  return await Conversation.deleteOne({ _id });
};
