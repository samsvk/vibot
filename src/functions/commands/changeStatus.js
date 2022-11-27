const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord.js");
const { handleStateChange, state } = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("changestatus")
    .setDescription("Change the Commission status for Vi")
    .addBooleanOption((option) =>
      option.setName("open").setDescription("true/false").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("min")
        .setDescription("Amount of Slots Filled.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("max")
        .setDescription("Amount of Slots Available.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const open = interaction.options.getBoolean("open");
    const min = interaction.options.getInteger("min");
    const max = interaction.options.getInteger("max");
    handleStateChange(open, min, max);
    await interaction.reply({
      content: `Commission status now set to: ${
        open === true ? "OPEN" : "CLOSED"
      } with a slots: ${min}/${max}`,
      ephemeral: true,
    });
  },
};
