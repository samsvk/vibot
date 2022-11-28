const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  blockQuote,
  bold,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("test")
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
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Commission Vi",
      })
      .setColor(15548997)
      .setDescription(
        `When commissioning Vi please understand the following terms so there's no confusion throughout the commission period.

         • PayPal is the only service I use for payments and all payments must be paid in full before work begins.
         • Provide reference, but refrain from extreme detail, I prefer 90% creative freedom.
         • I hold the right to decline any request I deem uncomfortable.
         • All orders are final and once payment is complete.
         • I am happy to keep comissions private if requested and agreed to before payment is made.
        `
      );

    let sendChannel = channel.send({
      embeds: [embed],
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
