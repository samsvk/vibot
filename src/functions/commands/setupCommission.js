const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  bold,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("setupcommission")
    .setDescription("Commission Vi")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");

    const sentence = `${bold(
      "Commission Vivixstar:"
    )}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPlease visit: <https://www.vivixstar.com/> for my recent art as reference to my current style/techniques.\n\n• PayPal is the only form of payment accepted and all fees must be paid upfront.\n• I reserve the right to decline any request I deem inappropriate.\n• Provide reference but refrain from large detail.\n• All orders are final once payment is complete.\n• I am happy to keep commissions private if requested.\n• Do not pressure/backseat.\n• If you have a commission request open, please DO NOT try to open another the bot will refuse and WILL delete your previous request if you try multiple times.\n\nIf you agree to these terms then please select below which type of commission you'd like to request. If accepted Vivixstar will contact you personally.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    let sendChannel = channel.send({
      content: sentence,
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("createCommissionCharacter")
            .setLabel("Character Art")
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId("createCommissionModel")
            .setLabel("2D Live Model")
            .setStyle(ButtonStyle.Danger)
        ),
      ],
    });

    if (!sendChannel) {
      return interaction.reply({ content: "there was an err", ephemeral: true });
    } else {
      return interaction.reply({
        content: "verify channel successfully set fam",
        ephemeral: true,
      });
    }
  },
};
