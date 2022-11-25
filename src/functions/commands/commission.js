const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commission")
    .setDescription("Replies with Vivixstar commission status"),
  async execute(interaction) {
    await interaction.reply("Commissions are now Open!");
  },
};
