const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { color, streamername } = require("../../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription(`Replies with ${streamername}'s social media platforms`),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(`${streamername} Socials`)
      .setDescription(
        `Remember to follow ${streamername} on her social medias for regular updates, videos and streams! Checkout ${streamername}'s website if you're interested in seeing recent commission and personal work(s).`
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
