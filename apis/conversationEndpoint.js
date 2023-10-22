const {
  getUserConversation,
} = require("../services/conversation/getUserConversation");
const {
  deleteConversation,
} = require("../services/conversation/deleteConversation");
const {
  createConversationMessage,
} = require("../services/conversation/createConversationMessage");
const {
  getConversationMessages,
} = require("../services/conversation/getConversationMessages");

module.exports.deleteConversation = async (req, res) => {
  await deleteConversation(req.params.conversationId);
  res.send(true)
};

module.exports.getConversations = async (req, res) => {
  const conversations = await getUserConversation(req.user);
  res.send(conversations)
};

module.exports.getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;
  const conversationMessages = await getConversationMessages(conversationId);
  res.send(conversationMessages);
};

module.exports.createMessage = async (req, res) => {
  const repsonseMessage = await createConversationMessage(
    req.body.conversationId,
    req.user._id,
    req.body.content
  );
  res.send(repsonseMessage);
};
