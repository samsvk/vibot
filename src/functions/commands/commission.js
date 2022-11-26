const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commission")
    .setDescription("Replies with Vivixstar commission status"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setTitle("https://vivixstar.com/")
      .setURL("https://vivixstar.com/information")
      .setAuthor({
        name: `Vi's Commissions are Open`,
        url: "https://vivixstar.com/",
      })
      .setDescription(
        "Commissions are currently open with 3/5 slots filled. Please visit vivixstar.com/information on how to commission me!"
      )
      .setTimestamp()
      .setFooter({
        text: "Thank you for using Vi Status",
      });
    await interaction.reply({ embeds: [embed] });
  },
};
