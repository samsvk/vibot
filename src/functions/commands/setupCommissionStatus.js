const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");

const { color, streamername } = require("../util/constants.js");
const { statusButton } = require("../buttons/status.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setupcommissionstatus")
    .setDescription(`Replies with ${streamername}'s social media platforms`)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(`${streamername}'s Commission Status`)
      .setDescription(
        `Use the button listed below to see Vivixstar's commission status.`
      );

    await channel.send({
      embeds: [embed],
      components: [statusButton()],
    });

    await interaction.reply({ content: "x", ephemeral: true });
  },
};
