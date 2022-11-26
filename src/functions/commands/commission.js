const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const state = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commission")
    .setDescription("Replies with Vivixstar commission status"),
  async execute(interaction, client) {
    const title = state.commission.status
      ? `Vi's commissions are OPEN`
      : `Vi's commissions are CLOSED`;

    const message = state.commission.status
      ? `Commissions are currently OPEN with ${state.commission.slots} filled. Please visit the above website on how to commission me!`
      : `Commissions are currently CLOSED with ${state.commission.slots} filled, please check back at a later date to see when my commissions are re-open!`;

    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setTitle("https://vivixstar.com/")
      .setURL("https://vivixstar.com/information")
      .setAuthor({
        name: title,
        url: "https://vivixstar.com/",
      })
      .setDescription(message)
      .setTimestamp()
      .setFooter({
        text: "Thank you for using Vi Status",
      });
    await interaction.reply({ embeds: [embed] });
  },
};
