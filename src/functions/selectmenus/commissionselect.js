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

// function createModal() {
//   return new ModalBuilder()
//     .setCustomId("commissionModal")
//     .setTitle("Character Art Commission")
//     .addComponents(
//       new ActionRowBuilder().addComponents(
//         new TextInputBuilder()
//           .setCustomId("characterStyle")
//           .setLabel("Style:")
//           .setPlaceholder("Icon, Half Body or Full Body")
//           .setStyle(TextInputStyle.Short)
//           .setMaxLength(20)
//           .setMinLength(1)
//       )
//     );
// }

module.exports = {
  id: "commissionselect",
  async execute(interaction, client) {
    await interaction.showModal(createModal());
  },
  menu: selectMenuTemplate,
};
