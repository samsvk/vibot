const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Replies with Vi's commission status"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Vi's commissons are currently open")
      .setDescription(
        "Commissions are currently open with 3/5 slots filled. Please visit vivixstar.com/information on how to commission me!"
      )
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`);
    await interaction.reply({ embeds: [embed] });
  },
};
