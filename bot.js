const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const botToken = process.env.token;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === "user") {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

client.login(botToken);
