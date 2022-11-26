const { REST, Routes, GuildMember, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    const channel = member.guild.channels.cache.get(
      member.guild.systemChannelId.toString()
    );
    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setAuthor({
        name: `Welcome, ${member.user.username}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
      .setDescription(
        `Welcome to Vi's Discord. There's currently ${member.guild.memberCount} members!`
      )
      .setTimestamp()
      .setFooter({
        text: "Thank you for using Vi Status",
      });

    channel.send({ embeds: [embed] });
  },
};
