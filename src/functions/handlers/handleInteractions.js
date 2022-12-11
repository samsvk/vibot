const {
  getFilesFromPath,
  getIndividualFileFromPath,
} = require("../util/constants.js");

module.exports = (client, fs, path, Collection) => {
  client.handleBotStart = async () => {
    for (const file of getFilesFromPath("/src/functions/events", fs)) {
      const _ = require(getIndividualFileFromPath(`/src/functions/events/${file}`));
      if (_.once) client.once(_.name, (...args) => _.execute(...args, client));
      else client.on(_.name, (...args) => _.execute(...args, client));
    }

    for (const folder of getFilesFromPath("/src/functions/components", fs, false)) {
      client[folder] = new Collection();
      for (const file of getFilesFromPath(
        `/src/functions/components/${folder}`,
        fs
      )) {
        const _ = require(getIndividualFileFromPath(
          `/src/functions/components/${folder}/${file}`
        ));
        client[folder].set(_.id || _.data.name, _);
      }
    }
  };
};
