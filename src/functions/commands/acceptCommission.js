const { SlashCommandBuilder, PermissionFlagsBits, bold } = require("discord.js");
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
        `${bold(
          "Your commission with Vivixstar was: ACCEPTED"
        )}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nHello! It's a pleasure to meet you I'm Vivixstar's discord bot (not a real human 😔) I'm just here to inform you that your commission has been accepted and to begin fulfilling your commission please add and direct message Vivixstar on discord: <@758675851440160809> to begin discussing finer details about your commission. \n\nIf you're interested in checking out Vivixstar's previous work please see: <https://vivixstar.com> for previous commissions and personal works.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      );

      await message.react("✅");
    } else {
      await mentionedUser.send(
        `${bold(
          "Your commission with Vivixstar was: DECLINED"
        )}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nHello! It's a pleasure to meet you I'm Vivixstar's discord bot (not a real human 😔) I'm sorry too inform you that your commission has been declined by Vivixstar. It's nothing personal, she just has a huge workload and to ensure she fulfills each piece to her full potential she doesn't take on large quantities of clients.\n\nDON'T be discouraged though, Vivixstar is now aware of who you are, and if you apply for commission on the next cycle you'll have an increased chance of being accepted.\n\nIf you're interested in checking out Vivixstar's previous work please see: <https://vivixstar.com> for previous commissions and personal works.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      );
      await channel.messages.delete(id);
    }

    await interaction.reply({
      content: `${
        accept ? "accepted" : "declined"
      }  commission with the id of: ${id}`,
      ephemeral: true,
    });
  },
};
