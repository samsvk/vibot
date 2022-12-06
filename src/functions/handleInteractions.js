function getFiles(name, fs, path) {
  return fs
    .readdirSync(path.join(__dirname, `/${name || ""}`))
    .filter((file) =>
      name ? file.endsWith(".js") : !file.endsWith(".js") && !file.includes("util")
    );
}

module.exports = (client, fs, path, Collection) => {
  client.handleBotStart = async () => {
    getFiles(null, fs, path).map((type) => {
      if (type === "events") {
        for (const file of getFiles("events", fs, path)) {
          const event = require(path.join(__dirname, "/events", file));
          if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
          } else {
            client.on(event.name, (...args) => event.execute(...args, client));
          }
        }
      }

      getFiles(null, fs, path)
        .filter((item) => item !== "events")
        .map((type) => {
          client[type] = new Collection();
          for (const file of getFiles(type, fs, path)) {
            const _ = require(path.join(__dirname, `/${type}`, file));
            client[type].set(_.id || _.data.name, _);
          }
        });
    });
  };
};
