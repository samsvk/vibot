const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  id: "verify",
  async execute(interaction, client) {
    if (interaction.member.roles.cache.some((item) => item.name === "verified")) {
      interaction.reply({
        content: `You are already verified.`,
        ephemeral: true,
      });
    } else {
      const modal = new ModalBuilder().setCustomId("myModal").setTitle("My Modal");
      const favoriteColorInput = new TextInputBuilder()
        .setCustomId("favoriteColorInput")
        .setLabel("Please enter your Discord name")
        .setStyle(TextInputStyle.Short);
      const hobbiesInput = new TextInputBuilder()
        .setCustomId("hobbiesInput")
        .setLabel("What's some of your favorite hobbies?")

        .setStyle(TextInputStyle.Paragraph);
      const firstActionRow = new ActionRowBuilder().addComponents(
        favoriteColorInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
      modal.addComponents(firstActionRow, secondActionRow);
      await interaction.showModal(modal);
    }
  },
};
