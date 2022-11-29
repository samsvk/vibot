const { bold } = require("discord.js");
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
};
