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
          const verifiedRole = interaction.guild.roles.cache.find(
            (item) => item.name === "verified"
          );
          return interaction.member.roles.add(verifiedRole).then((member) =>
            interaction.reply({
              content: `${verifiedRole} has been assigned to you`,
              ephemeral: true,
            })
          );
          break;
        default:
          return null;
      }
    }
  },
};
