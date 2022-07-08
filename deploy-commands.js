"use strict";
// Run ONCE only (COMPLETE)
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
dotenv.config();
const botId = process.env.CLIENT_ID;
const serverId = process.env.GUILD_ID;
const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server info!"),
    new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user info!"),
].map((command) => command.toJSON());
const rest = new REST({ version: "9" }).setToken(botToken);
rest
    .put(Routes.applicationGuildCommands(botId, serverId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
