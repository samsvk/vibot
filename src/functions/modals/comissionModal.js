module.exports = {
  id: "commissionModal",
  async execute(interaction, client) {
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

    const style = cachedFields.find(
      (item) => item.name === "modelStyle" || item.name === "characterStyle"
    );
    const details = cachedFields.find(
      (item) => item.name === "modelDetails" || item.name === "characterDetails"
    );
    const line = cachedFields.find(
      (item) => item.name === "modelLine" || item.name === "characterLine"
    );
    const commercial = cachedFields.find(
      (item) =>
        item.name === "modelCommercial" || item.name === "characterCommercial"
    );
    const background = cachedFields.find(
      (item) => item.name === "characterBackground"
    );

    if (modalType) {
      await channel.send({
        content: `NEW Live 2d Model Art commission from ${interaction.user.username}#${interaction.user.discriminator} > commission style: ${style.value}, details: ${details.value}, line style: ${line.value} and commercial rights: ${commercial.value}`,
      });

      await interaction.reply({
        content: `Commission created.`,
        ephemeral: true,
      });
    } else {
      await channel.send({
        content: `NEW Character Art commission from ${interaction.user.username}#${interaction.user.discriminator} > commission style: ${style.value}, details: ${details.value}, line style: ${line.value} background: ${background.value} and commercial rights: ${commercial.value}`,
      });
      await interaction.reply({
        content: `Commission created.`,
        ephemeral: true,
      });
    }
  },
};
