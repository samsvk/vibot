module.exports = {
  id: "verify",
  async execute(interaction, client) {
    if (interaction.member.roles.cache.some((item) => item.name === "verified")) {
      interaction.reply({
        content: `You are already verified.`,
        ephemeral: true,
      });
    } else {
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
