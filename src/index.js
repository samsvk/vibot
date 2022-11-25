require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

const handlerFiles = fs
  .readdirSync(`${__dirname}/functions`)
  .filter((file) => file.endsWith(".js"));

for (const file of handlerFiles) {
  const f = path.join(__dirname, "functions", file);
  //   console.log(f, "f");
  //   console.log(f);
  require(f)(client);
}

client.handleCommands();
client.login(process.env.BOT_TOKEN);
