const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const { checkInteractionRole } = require("../util/constants.js");

function generateNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

module.exports = {
  id: "verify",
  async execute(interaction, client) {
    if (checkInteractionRole(interaction, "verified")) {
      interaction.reply({
        content: `You are already verified`,
        ephemeral: true,
      });
    } else {
      const firstNum = generateNumber();
      const secondNumber = generateNumber();
      const sum = `Please answer: ${firstNum} + ${secondNumber}`;
      const answer = firstNum + secondNumber;

      const modal = new ModalBuilder()
        .setCustomId("verifyModal")
        .setTitle("Verification Request");
      const favoriteColorInput = new TextInputBuilder()
        .setCustomId(`correctAnswer_${answer}`)
        .setLabel(sum)
        .setPlaceholder("Type the correct answer here to be verified...")
        .setStyle(TextInputStyle.Short);
      const firstActionRow = new ActionRowBuilder().addComponents(
        favoriteColorInput
      );
      modal.addComponents(firstActionRow);
      await interaction.showModal(modal);
    }
  },
};
