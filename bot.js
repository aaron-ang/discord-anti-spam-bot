"use strict";
const fs = require("node:fs");
const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
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
    .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.login(botToken);
