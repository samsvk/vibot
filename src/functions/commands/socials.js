const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { color, name } = require("../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription(`Replies with ${name}'s social media platforms`),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(color)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setAuthor({
        name: `${name} Socials`,
        url: "https://vivixstar.com/",
      })
      .setDescription(
        `${name}'s website contains a studio display showcasing her art. Visit the information page to calculate the price of a commission if you need. Please also follow her socials below for regular updates, tutorial and timelapse videos soon.`
      );
    await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel(`${name}'s Website`)
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
