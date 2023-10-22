const apiKey = require('../../config.js').GPT_KEY;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

module.exports.createGPTMessage = async (messages) => {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  return chatCompletion.data.choices[0].message;
};
