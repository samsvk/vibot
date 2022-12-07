const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { color, streamername } = require("../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription(`Replies with ${streamername}'s social media platforms`),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(color)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setTitle(`${streamername} Socials`)
      .setDescription(
        `${streamername}'s website contains a studio display showcasing her art. Visit the information page to calculate the price of a commission if you need. Please also follow her socials below for regular updates, tutorial and timelapse videos soon.`
      );
    await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel(`${streamername}'s Website`)
            .setURL("https://vivixstar.com")
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setLabel("Twitter")
            .setURL("https://twitter.com/vivixstar")
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setLabel("Twitch")
            .setURL("https://twitch.tv/vivixstar")
            .setStyle(ButtonStyle.Link)
        ),
      ],
    });
  },
};
