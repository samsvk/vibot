module.exports = {
  id: "verifyModal",
  async execute(interaction, client) {
    const value = interaction.fields.fields.map((item) => item)[0];
    const isCorrect = +value.value === +value.customId.split("_")[1];

    if (interaction.member.roles.cache.some((item) => item.name === "verified")) {
      interaction.reply({
        content: `You are already verified.`,
        ephemeral: true,
      });
    }

    if (!isCorrect) {
      interaction.reply({
        content: `Incorrect captcha, please try again.`,
        ephemeral: true,
      });
    }

    if (isCorrect) {
      return interaction.member.roles
        .add(interaction.guild.roles.cache.find((item) => item.name === "verified"))
        .then((member) =>
          interaction.reply({
            content: `Verified role has been assigned to you`,
            ephemeral: true,
          })
        );
    }
  },
};
