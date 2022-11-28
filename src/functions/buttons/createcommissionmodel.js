const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  id: "createCommissionModel",
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("commissionModal")
      .setTitle("Live 2D Model Art Commission");

    const commissionStyle = new TextInputBuilder()
      .setCustomId("modelStyle")
      .setLabel("Style:")
      .setPlaceholder("Half Body or Full Body")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(20)
      .setMinLength(1);

    const commissionDetails = new TextInputBuilder()
      .setCustomId("modelDetails")
      .setLabel("Provide some details.")
      .setPlaceholder("Please provide some details on your commission.")
      .setStyle(TextInputStyle.Paragraph);

    const lineDetails = new TextInputBuilder()
      .setCustomId("modelLine")
      .setLabel("Line Definition")
      .setPlaceholder("Line Art/Flat Color/Full Illustration")
      .setStyle(TextInputStyle.Short);

    const commercialDetails = new TextInputBuilder()
      .setCustomId("modelCommercial")
      .setLabel("Do you want commercial rights?")
      .setPlaceholder("Yes/No")
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(commissionStyle);
    const secondActionRow = new ActionRowBuilder().addComponents(commissionDetails);
    const thirdActionRow = new ActionRowBuilder().addComponents(lineDetails);
    const fourthActionRow = new ActionRowBuilder().addComponents(commercialDetails);

    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow
    );
    await interaction.showModal(modal);
  },
};
