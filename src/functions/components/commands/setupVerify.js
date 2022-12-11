const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { color } = require("../../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("setupverify")
    .setDescription("User verification system.")
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
      .setTitle(`Verification, Rules & Regulations`)
      .setColor(color)
      .setDescription(
        `Trust & Safety is an important factor in keeping our community clean and friendly please read the following rules and agree by verifying to access the discord

• Be respectful: Common decency goes a long way - treat others how you'd like to be treated.

• Toxicity: Trauma dumping, drama dumping, triggering topics, venting, or general toxicity is not welcome.

• NSFW materials: There's a specific time and place for this content, please use the correct channels to do so.

• No hate speech tolerated: Any offensive/innappropriate profiles or messages will be punished by a ban.

• No Advertising: We do not tolerate any kind of advertisements, whether it be for another community or stream. You can post your own CONTENT in the self-promo channel if it's relevant to art, gaming etc.`
      );

    let sendChannel = channel.send({
      embeds: [embed],
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("verify")
            .setLabel("Complete Verification")
            .setStyle(ButtonStyle.Secondary)
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
