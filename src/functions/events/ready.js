const { REST, Routes } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const guild_ids = client.guilds.cache.map((guild) => guild.id);
    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
    for (const guildId of guild_ids) {
      rest
        .put(Routes.applicationGuildCommands(process.env.CLI_ID, guildId), {
          body: client.commands.map((item) => item.data.toJSON()),
        })
        .then(() =>
          console.log("Successfully updated commands for guild " + guildId)
        )
        .catch(console.error);
    }
  },
};
