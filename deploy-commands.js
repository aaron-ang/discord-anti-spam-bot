"use strict";
// Run ONCE only (COMPLETE)
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const botId = process.env.CLIENT_ID;
const serverId = process.env.GUILD_ID;
const botToken = process.env.BOT_TOKEN;
const commands = [
    new builders_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    new builders_1.SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server info!"),
    new builders_1.SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user info!"),
].map((command) => command.toJSON());
const rest = new rest_1.REST({ version: "9" }).setToken(botToken);
rest
    .put(v9_1.Routes.applicationGuildCommands(botId, serverId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
