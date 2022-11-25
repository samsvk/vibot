const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("status").setDescription("mommy milkers"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Vi's commissons are currently open")
      .setDescription("Bipbop")
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`);
    await interaction.reply({ embeds: [embed] });
  },
};
