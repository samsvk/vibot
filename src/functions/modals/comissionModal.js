const { bold } = require("discord.js");
const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

const commercialDetails = new TextInputBuilder()
  .setCustomId("characterCommercial")
  .setLabel("Do you want commercial rights?")
  .setPlaceholder("Yes/No")
  .setStyle(TextInputStyle.Short);

function createModal() {
  return new ModalBuilder()
    .setCustomId("commissionModal")
    .setTitle("Character Art Commission")
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("characterStyle")
          .setLabel("Style:")
          .setPlaceholder("Icon, Half Body or Full Body")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(20)
          .setMinLength(1)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("characterDetails")
          .setLabel("Provide some details.")
          .setPlaceholder("Please provide some details on your commission.")
          .setStyle(TextInputStyle.Paragraph)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("characterLine")
          .setLabel("Line Definition")
          .setPlaceholder("Line Art/Flat Color/Full Illustration")
          .setStyle(TextInputStyle.Short)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("characterBackground")
          .setLabel("Background")
          .setPlaceholder("Yes/No")
          .setStyle(TextInputStyle.Short)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId("characterCommercial")
          .setLabel("Do you want commercial rights?")
          .setPlaceholder("Yes/No")
          .setStyle(TextInputStyle.Short)
      )
    );
}

module.exports = {
  id: "commissionModal",
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.some(
        (item) => item.name === "commission_pending"
      )
    ) {
      await interaction.reply({
        content: `You already have a commission request pending, please allow Vi time to accept or decline. Thank you.`,
        ephemeral: true,
      });
      return null;
    }

    const modalType = interaction.fields.fields
      .map((item) => item)[0]
      .customId.includes("model")
      ? true
      : false;

    const channel = interaction.member.guild.channels.cache.find(
      (item) => item.name === "admin_commission"
    );

    const cachedFields = interaction.fields.fields.map((item) => ({
      name: item.customId,
      value: item.value,
    }));

    const values = cachedFields.map((item) => ({
      name: Object.values(item)[0].split(/(?=[A-Z])/)[1],
      value: Object.values(item)[1],
    }));

    const sentence = `• ${bold("Type:")} ${
      modalType ? "Live 2D Model" : "Character Art"
    }\n${values
      .map((item) => `• ${bold(`${item.name}`)}: ${item.value}\n`)
      .join("")}\n— Commission request from: <@${interaction.user.id}>`;

    await interaction.member.roles.add(
      interaction.guild.roles.cache.find(
        (item) => item.name === "commission_pending"
      )
    );

    if (modalType) {
      channel
        .send({
          content: sentence,
        })
        .then((msg) => {
          msg.edit({
            content: `${bold(`New Commission with ID: ${msg.id}`)} \n\n${
              msg.content
            }\n`,
          });
        });
      await interaction.reply({
        content: `Commission created.`,
        ephemeral: true,
      });
    } else {
      channel
        .send({
          content: sentence,
        })
        .then((msg) => {
          msg.edit({
            content: `${bold(`New Commission with ID: ${msg.id}`)} \n\n${
              msg.content
            }\n`,
          });
        });
      await interaction.reply({
        content: `Commission created.`,
        ephemeral: true,
      });
    }
  },
  createModal,
};
