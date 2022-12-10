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

const getFilesFromPath = (pathName, fs, jsFiles = true) => {
  return fs
    .readdirSync(process.cwd() + pathName)
    .filter((file) => (jsFiles ? file.endsWith(".js") : !file.endsWith(".js")));
};

const getIndividualFileFromPath = (pathName) => {
  return process.cwd() + pathName;
};

module.exports = {
  streamername,
  color,
  checkInteractionRole,
  findChannelInGuild,
  getFilesFromPath,
  getIndividualFileFromPath,
};
