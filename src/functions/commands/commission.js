const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { state } = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commission")
    .setDescription("Replies with Vivixstar commission status"),
  async execute(interaction, client) {
    const title = `Vi's commissions are currently: ${
      state.commission.status ? "OPEN" : "CLOSED"
    }`;

    const message = `Commissions are currently ${
      state.commission.status ? "OPEN" : "CLOSED"
    } with ${state.commission.slots} slots filled. 
        ${
          state.commission.status
            ? " Please visit the above website on how to commission me!"
            : " Please check back at a later date to see when my commissions are re-open!"
        }`;

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
