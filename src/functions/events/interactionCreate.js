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
      const button = client.buttons.get(interaction.customId);
      try {
        await button.execute(interaction, client);
      } catch (error) {
        await interaction.reply({
          content: "There was an error executing this button function",
        });
      }
    }

    if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      try {
        await modal.execute(interaction, client);
      } catch (error) {
        await interaction.reply({
          content: "There was an error executing this modal function",
        });
      }
    }

    if (interaction.isSelectMenu()) {
      const selectmenu = client.selectmenus.get(interaction.customId);
      try {
        await selectmenu.execute(interaction, client);
      } catch (error) {
        await interaction.reply({
          content: "There was an error executing this selectmenu function",
        });
      }
    }
  },
};
