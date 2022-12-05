const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const startBot = async (client) => {
  const handlerFiles = fs
    .readdirSync(`${process.cwd()}/src/functions`)
    .filter((file) => file.endsWith(".js"));

  for (const file of handlerFiles) {
    const f = path.join(process.cwd(), "src/functions", file);
    require(f)(client, fs, path, Collection);
  }

  client.handleEvents();
  client.handleInteractions();
  client.login(process.env.BOT_TOKEN);
  // console.log(client);
};

module.exports = { startBot };
