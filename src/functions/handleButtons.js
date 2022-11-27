module.exports = (client, fs, path) => {
  client.handleButtons = async () => {
    const buttonFiles = fs
      .readdirSync(path.join(__dirname, "/buttons"))
      .filter((file) => file.endsWith(".js"));

    for (const file of buttonFiles) {
      const btn = require(path.join(__dirname, "/buttons", file));
      client.buttons.set(btn.id, btn);
    }
  };
};
