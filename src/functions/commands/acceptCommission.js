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
    const channel = await client.channels.fetch(interaction.channel.id);
    const message = await channel.messages.fetch(id);
    const mentionedUser = client.users.cache.get(
      message.mentions.users.map((item) => item.id)[0]
    );

    if (accept) {
      await mentionedUser.send(
        `Hello! It's Vibot here. I have some great news for you 😊. Vi has decided to accept your commission please DM her on Discord or @ her in general chat to start with your commission!`
      );
      await message.react("✅");
    } else {
      await mentionedUser.send(
        `Hello! It's Vibot here. I have some news I regret to inform you. Vi has been unable to accept your commission. We're sorry, please try again on the next commission cycle if you wish to try again!`
      );
      await channel.messages.delete(id);
    }

    await interaction.reply({
      content: `${
        accept ? "accepted" : "declined commission with the id of:"
      } ${id}`,
      ephemeral: true,
    });
  },
};
