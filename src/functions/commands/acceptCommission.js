const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { state } = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accept")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setDescription("accept or decline a commission")
    .addBooleanOption((option) =>
      option.setName("accept").setDescription("true/false").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("discord name#id of user")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const accept = interaction.options.getBoolean("accept");
    const id = interaction.options.getString("id");

    if (accept) {
      client.channels
        .fetch(interaction.channel.id)
        .then((chan) => chan.messages.fetch(id))
        .then((_) => {
          client.users.cache
            .get(_.mentions.users.map((item) => item.id)[0])
            .send(
              `Hello! It's Vibot here. I have some great news for you 😊. Vi has decided to accept your commission please DM her on Discord or @ her in general chat to start with your commission!`
            );
        });
      client.channels
        .fetch(interaction.channel.id)
        .then((chan) => chan.messages.fetch(id))
        .then((_) => _.react("✅"));
    } else {
      client.channels
        .fetch(interaction.channel.id)
        .then((chan) => chan.messages.fetch(id))
        .then((_) => {
          client.users.cache
            .get(_.mentions.users.map((item) => item.id)[0])
            .send(
              `Hello! I hope you're having a wonderful day. It's Vibot here just informing you that unfortunately Vi has been unable to accept your commission😔. Please don't be discouraged though when her next commission cycle is open try again!`
            );
        });
      client.channels
        .fetch(interaction.channel.id)
        .then((chan) => chan.messages.delete(id));
    }

    await interaction.reply({
      content: `${
        accept ? "accepted" : "declined commission with the id of:"
      } ${id}`,
      ephemeral: true,
    });
  },
};
