const { bold } = require("discord.js");
module.exports = {
  id: "commissionModal",
  async execute(interaction, client) {
    console.log(interaction.user.id);

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

    const sentence = `${
      modalType ? "Live 2D Model" : "Character Art"
    } commission from: <@${interaction.user.id}> — ${values
      .map((item) => `${item.name}: ${item.value}`)
      .join(", ")}`;

    if (modalType) {
      channel
        .send({
          content: sentence,
        })
        .then((msg) => {
          console.log(msg);
          msg.edit({ content: `ID: ${msg.id} ---- ${msg.content}` });
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
          console.log(msg);
          msg.edit({ content: `ID: ${msg.id} ---- ${msg.content}` });
        });
      await interaction.reply({
        content: `Commission created.`,
        ephemeral: true,
      });
    }
  },
};
