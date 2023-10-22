const app = require("express").Router();
const errorHandler = require("../middlewares/ErrorHandler");
const conversationEndpoint = require("../apis/conversationEndpoint");
const { checkAuth } = require("../middlewares/Auth");

app.use(checkAuth);
app.get("/", errorHandler(conversationEndpoint.getConversations));
app.delete("/:conversationId", errorHandler(conversationEndpoint.deleteConversation));
app.get("/:conversationId/messages", errorHandler(conversationEndpoint.getConversationMessages));
app.post("/messages", errorHandler(conversationEndpoint.createMessage));

module.exports = app;
