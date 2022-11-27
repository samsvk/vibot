const { REST, Routes, GuildMember, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
    rest
      .put(Routes.applicationGuildCommands(process.env.CLI_ID, guild.id), {
        body: client.commands.map((item) => item.data.toJSON()),
      })
      .then(() => console.log("Successfully updated commands for guild " + guild.id))
      .catch(console.error);
  },
};
