const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  id: "createCommissionCharacter",
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("commissionModal")
      .setTitle("Character Art Commission");

    const commissionStyle = new TextInputBuilder()
      .setCustomId("characterStyle")
      .setLabel("Style:")
      .setPlaceholder("Icon, Half Body or Full Body")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(20)
      .setMinLength(1);

    const commissionDetails = new TextInputBuilder()
      .setCustomId("characterDetails")
      .setLabel("Provide some details.")
      .setPlaceholder("Please provide some details on your commission.")
      .setStyle(TextInputStyle.Paragraph);

    const lineDetails = new TextInputBuilder()
      .setCustomId("characterLine")
      .setLabel("Line Definition")
      .setPlaceholder("Line Art/Flat Color/Full Illustration")
      .setStyle(TextInputStyle.Short);

    const backgroundDetails = new TextInputBuilder()
      .setCustomId("characterBackground")
      .setLabel("Background")
      .setPlaceholder("Yes/No")
      .setStyle(TextInputStyle.Short);

    const commercialDetails = new TextInputBuilder()
      .setCustomId("characterCommercial")
      .setLabel("Do you want commercial rights?")
      .setPlaceholder("Yes/No")
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(commissionStyle);
    const secondActionRow = new ActionRowBuilder().addComponents(commissionDetails);
    const thirdActionRow = new ActionRowBuilder().addComponents(lineDetails);
    const fourthActionRow = new ActionRowBuilder().addComponents(backgroundDetails);
    const fithActionRow = new ActionRowBuilder().addComponents(commercialDetails);

    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow,
      fithActionRow
    );
    await interaction.showModal(modal);
  },
};
