const streamername = "Vivixstar";
const color = "#202225";

const checkInteractionRole = (interaction, role) => {
  return interaction.member.roles.cache.some((item) => item.name === role);
};

module.exports = { streamername, color, checkInteractionRole };
