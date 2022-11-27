module.exports = (client, fs, path) => {
  client.handleCommands = async () => {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "/commands"))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(path.join(__dirname, "/commands", file));
      client.commands.set(command.data.name, command);
    }
  };
};