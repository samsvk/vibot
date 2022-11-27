const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { state } = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .setRequired(true)
    )
    .setDescription("Replies with Vivixstar's social media platforms"),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setImage("https://i.imgur.com/8UXxRG6.png");
    let sendChannel = channel.send({
      embeds: [embed],
    });

    if (!sendChannel) {
      return interaction.reply({ content: "there was an err", ephemeral: true });
    } else {
      return interaction.reply({
        content: "socials sent",
        ephemeral: true,
      });
    }
  },
};
