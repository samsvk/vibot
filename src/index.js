require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
});

const handlerFiles = fs
  .readdirSync(`${__dirname}/functions`)
  .filter((file) => file.endsWith(".js"));

for (const file of handlerFiles) {
  const f = path.join(__dirname, "functions", file);
  require(f)(client, fs, path, Collection);
}

client.handleEvents();
client.handleCommands();
client.handleButtons();
client.handleModals();
client.login(process.env.BOT_TOKEN);
