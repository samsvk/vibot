const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("purge")
    .setDescription("deleted the last 25 messages")
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
