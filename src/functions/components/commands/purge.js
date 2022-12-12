const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
} = require("discord.js");
const { menu } = require("../selectmenus/commissionselect.js");
const { streamername, color } = require("../../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("purge")
    .setDescription("deleted the last 50 messages")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
    await channel.messages
      .fetch({ limit: 25 })
      .then((_) => channel.bulkDelete(_))
      .then(interaction.reply({ content: "deleted", ephemeral: true }))
      .catch((err) => {
        interaction.reply({ content: `failed, with err: ${err}`, ephemeral: true });
      });
  },
};
