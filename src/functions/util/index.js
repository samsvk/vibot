const { Collection, ActivityType } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  getFilesFromPath,
  getIndividualFileFromPath,
} = require("../util/constants.js");

const startBot = async (client) => {
  for (const file of getFilesFromPath(`/src/functions/handlers`, fs)) {
    require(getIndividualFileFromPath(`/src/functions/handlers/${file}`))(
      client,
      fs,
      path,
      Collection
    );
  }

  client.handleBotStart();
  client.login(process.env.BOT_TOKEN);
};

module.exports = { startBot };
