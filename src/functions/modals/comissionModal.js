module.exports = {
  id: "commissionModal",
  async execute(interaction, client) {
    console.log(
      "commission modal",
      interaction.fields.fields.map((item) => item)[0]
    );

    const modalType = interaction.fields.fields
      .map((item) => item)[0]
      .customId.includes("model")
      ? true
      : false;

    if (modalType) {
    } else {
    }
  },
};
