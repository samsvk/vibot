module.exports = (client, fs, path) => {
  client.handleModals = async () => {
    const modalFiles = fs
      .readdirSync(path.join(__dirname, "/modals"))
      .filter((file) => file.endsWith(".js"));

    for (const file of modalFiles) {
      const mdl = require(path.join(__dirname, "/modals", file));
      client.modals.set(mdl.id, mdl);
    }
  };
};
