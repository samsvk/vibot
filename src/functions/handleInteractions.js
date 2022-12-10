const {
  getFilesFromPath,
  getIndividualFileFromPath,
} = require("./util/constants.js");

module.exports = (client, fs, path, Collection) => {
  client.handleBotStart = async () => {
    getFilesFromPath("/src/functions", fs, false)
      .filter((item) => item !== "util")
      .map((filePathName) => {
        switch (filePathName) {
          case "events":
            for (file of getFilesFromPath(`/src/functions/${filePathName}`, fs)) {
              const _ = require(getIndividualFileFromPath(
                `/src/functions/events/${file}`
              ));
              if (_.once)
                client.once(_.name, (...args) => _.execute(...args, client));
              else client.on(_.name, (...args) => _.execute(...args, client));
            }
            break;
          default:
            client[filePathName] = new Collection();
            for (const file of getFilesFromPath(
              `/src/functions/${filePathName}`,
              fs
            )) {
              const _ = require(getIndividualFileFromPath(
                `/src/functions/${filePathName}/${file}`
              ));
              client[filePathName].set(_.id || _.data.name, _);
            }
        }
      });
  };
};
