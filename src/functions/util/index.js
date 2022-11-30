const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const startBot = (client) => {
  const handlerFiles = fs
    .readdirSync(`${process.cwd()}/src/functions`)
    .filter((file) => file.endsWith(".js"));

  for (const file of handlerFiles) {
    const f = path.join(process.cwd(), "src/functions", file);
    console.log(f);
    require(f)(client, fs, path, Collection);
  }

  client.handleEvents();
  client.handleCommands();
  client.handleButtons();
  client.handleModals();
  client.login(process.env.BOT_TOKEN);
};

module.exports = { startBot };
