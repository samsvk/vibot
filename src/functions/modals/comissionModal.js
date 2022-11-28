module.exports = {
  id: "commissionModal",
  async execute(interaction, client) {
    const modalType = interaction.fields.fields
      .map((item) => item)[0]
      .customId.includes("model")
      ? true
      : false;

    if (modalType) {
      const cachedFields = interaction.fields.fields.map((item) => ({
        name: item.customId,
        value: item.value,
      }));

      const style = cachedFields.find((item) => item.name === "modelStyle");
      const details = cachedFields.find((item) => item.name === "modelDetails");
      const line = cachedFields.find((item) => item.name === "modelLine");
      const commercial = cachedFields.find(
        (item) => item.name === "modelCommercial"
      );

      const channel = interaction.member.guild.channels.cache.find(
        (item) => item.name === "admin_commission"
      );

      await channel.send({
        content: `new commission from ${interaction.user.username}#${interaction.user.discriminator} > commission style: ${style.value}, details: ${details.value}, line style: ${line.value} and commercial rights: ${commercial.value}`,
      });

      await interaction.reply({
        content: `Commission created.`,
        ephemeral: true,
      });
    } else {
    }
  },
};
