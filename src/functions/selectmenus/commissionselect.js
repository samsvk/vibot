const {
  ActionRowBuilder,
  SelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

const { createModal } = require("../modals/comissionModal.js");

function selectMenuTemplate() {
  return new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId("commissionselect")
      .setPlaceholder("Select your commission type...")
      .addOptions(
        {
          label: "Character Art",
          value: "character_art",
        },
        {
          label: "2D Live Model Art",
          value: "2d_live_model_art",
        }
      )
  );
}

module.exports = {
  id: "commissionselect",
  async execute(interaction, client) {
    await interaction.showModal(
      createModal(
        interaction.values
          .map((item) => item)[0]
          .toString()
          .includes("model")
      )
    );
  },
  menu: selectMenuTemplate,
};
