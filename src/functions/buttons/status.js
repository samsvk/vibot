const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { state } = require("../../store/state.js");
const { streamername } = require("../util/constants.js");
const BUTTON_ID = "status";

function generateButton() {
  return new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(BUTTON_ID)
      .setLabel("Check Commission Status")
      .setStyle(ButtonStyle.Secondary)
  );
}

module.exports = {
  statusButton: generateButton,
  id: BUTTON_ID,
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.some(
        (item) => item.name === "commission_pending"
      )
    ) {
      return await interaction.reply({
        content: `You currently have a pending commission request. Commissions are currently: ${
          state.commission.status === true ? "OPEN" : "CLOSED"
        } with slots: ${state.commission.slots} filled`,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `Commissions are currently: ${
        state.commission.status === true ? "OPEN" : "CLOSED"
      } with slots: ${state.commission.slots} filled`,
      ephemeral: true,
    });
  },
};
