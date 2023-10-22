const Message = require("../../models/Message");
const { createGPTMessage } = require("./createGPTMessage");

module.exports.createConversationTitle = async (message) => {
  const title = await createGPTMessage([
    {
      role: "system",
      content: "Sen yazılan metin veya cümleye uygun başlık yazıyorsun. (Bu başlık 5, 6 kelimeyi aşmasın.)"
    },
    {
      role: "user",
      content:
        "Senden şimdi vereceğim bir metinden yola çıkarak bir iki üç kelimeli bir başlık yazmanı istiyorum",
    },
    {
      role: "assistant",
      content:
        "Elbette, lütfen metni paylaşın, ardından da buna uygun bir başlık önerisi sunabilirim.",
    },
    {
      role: "user",
      content: message,
    },
  ]);

  return title.content.replace('"', "");
};
