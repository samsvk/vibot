const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { state } = require("../../store/state.js");

const images = [
  "https://i.imgur.com/LZe9TkL.png",
  "https://i.imgur.com/8UXxRG6.png",
  "https://i.imgur.com/0N7WSLl.png",
  "https://i.imgur.com/fi9EALq.png",
  "https://i.imgur.com/Xw8Zajk.png",
  "https://i.imgur.com/fYU78sm.png",
  "https://i.imgur.com/ULuFJsm.png",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomart")
    .setDescription("Replies with Vivixstar's social media platforms"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setImage(`${images[Math.floor(Math.random() * images.length)]}`);

    return interaction.reply({ embeds: [embed] });
  },
};
