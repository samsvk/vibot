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
    .setName("setupverify")
    .setDescription("send verification embed to this channel :D")
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
        name: "Verification, Rules & Regulations",
      })
      .setColor(15548997)
      .setDescription(
        "Trust & Safety is an important factor in keeping our community clean and friendly please read the following rules and agree by verifying to access the discord.\n\n• Common decency and politeness go a long way\n• No toxicity, trauma dumping, drama, triggering topics, venting\n• No shocking content\n• No spam or self-promoting\n"
      );

    let sendChannel = channel.send({
      embeds: [embed],
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("verify")
            .setLabel("Complete Verification")
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
