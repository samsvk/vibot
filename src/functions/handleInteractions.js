const interactionTypes = ["buttons", "modals", "commands"];

module.exports = (client, fs, path, Collection) => {
  client.handleInteractions = async () => {
    interactionTypes.map((type) => {
      client[type] = new Collection();

      const typeFiles = fs
        .readdirSync(path.join(__dirname, `/${type}`))
        .filter((file) => file.endsWith(".js"));

      for (const file of typeFiles) {
        const _ = require(path.join(__dirname, `/${type}`, file));
        client[type].set(_.id || _.data.name, _);
      }
    });
  };

  client.handleEvents = async () => {
    const eventFiles = fs
      .readdirSync(path.join(__dirname, "/events"))
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(path.join(__dirname, "/events", file));
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};
