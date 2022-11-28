const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { state } = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accept")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setDescription("accept or decline a commission")
    .addBooleanOption((option) =>
      option.setName("accept").setDescription("true/false").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("discord name#id of user")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const accept = interaction.options.getBoolean("accept");
    const id = interaction.options.getString("id");
    await interaction.reply({
      content: `${
        accept ? "accepted" : "declined commission with the id of:"
      } ${id}`,
      ephemeral: true,
    });
  },
};
