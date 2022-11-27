require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
});

client.commands = new Collection();
client.buttons = new Collection();

const handlerFiles = fs
  .readdirSync(`${__dirname}/functions`)
  .filter((file) => file.endsWith(".js"));

for (const file of handlerFiles) {
  const f = path.join(__dirname, "functions", file);
  require(f)(client, fs, path);
}

client.handleEvents();
client.handleCommands();
client.handleButtons();

client.login(process.env.BOT_TOKEN);
