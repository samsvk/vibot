require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { startBot } = require("./functions/util/index.js");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
});

(async () => await startBot(client))();
