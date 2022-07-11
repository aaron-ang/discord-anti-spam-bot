import fs from "fs";
import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const botToken = process.env.BOT_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
  ],
});

// Returns an array of all the file names in the given directory and filters for only .js files
const eventFiles = fs
  .readdirSync("./events")
  .filter((file: string) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}

client.login(botToken);
