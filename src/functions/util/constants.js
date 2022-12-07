const streamername = "Vivixstar";
const color = "#202225";

const checkInteractionRole = (interaction, role) => {
  return interaction.member.roles.cache.some((item) => item.name === role);
};

const findChannelInGuild = (interaction, channelName) => {
  return interaction.member.guild.channels.cache.find(
    (item) => item.name === channelName
  );
};

module.exports = { streamername, color, checkInteractionRole, findChannelInGuild };
