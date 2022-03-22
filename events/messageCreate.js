module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.bot) return;
    
    if (message.content.startsWith("test")) {
      message.delete(500);
      message.channel.send("message deleted");
    }
  },
};
