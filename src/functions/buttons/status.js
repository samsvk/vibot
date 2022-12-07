const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

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
    console.log("hi");
  },
};
