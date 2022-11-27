module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error executing this command",
        });
      }
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "verify":
          if (
            interaction.member.roles.cache.some((item) => item.name === "verified")
          ) {
            interaction.reply({
              content: `You are already verified, enjoy using our Discord.`,
              ephemeral: true,
            });
          } else {
            return interaction.member.roles
              .add(
                interaction.guild.roles.cache.find(
                  (item) => item.name === "verified"
                )
              )
              .then((member) =>
                interaction.reply({
                  content: `Verified role has been assigned to you`,
                  ephemeral: true,
                })
              );
          }

        default:
          return null;
      }
    }
  },
};
