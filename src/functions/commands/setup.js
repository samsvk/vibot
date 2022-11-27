const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("createverify")
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
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setAuthor({
        name: "Please Verify before accessing the Discord",
        url: "https://vivixstar.com/",
      })
      .setDescription(
        "Trust & Safety is an important factor in keeping our community clean and friendly please read the following rules and agree by verifying to access the discord."
      )
      .setTimestamp()
      .setFooter({
        text: "Thank you for using Vi Status",
      });

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
