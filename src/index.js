require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { startBot } = require("./functions/util/index.js");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
});

startBot(client);
