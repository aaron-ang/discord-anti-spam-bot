module.exports = {
  name: "interactionCreate",
  execute(interaction: {
    isCommand?: any;
    user?: any;
    channel?: any;
    reply?: any;
    guild?: any;
    commandName?: any;
  }) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );

    if (commandName === "ping") {
      interaction.reply("Pong!");
    } else if (commandName === "server") {
      interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
    } else if (commandName === "user") {
      interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
      );
    }
  },
};
