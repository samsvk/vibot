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
        `Please use the below button to check ${streamername}'s commission status. If there's slots available I'll let you know, if not... then I'll also let you know hehe!`
      );

    await channel.send({
      embeds: [embed],
      components: [statusButton()],
    });

    await interaction.reply({ content: "x", ephemeral: true });
  },
};
