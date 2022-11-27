const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { state } = require("../../store/state.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription("Replies with Vivixstar's social media platforms"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setAuthor({
        name: "Follow Vivixstar everywhere!",
        url: "https://vivixstar.com/",
      })
      .setDescription(
        `Thanks for following Vi, you'll be able to get regular updates on her socials when she's live, when her commissions are open etc.`
      )
      .setTimestamp()
      .setFooter({
        text: "Thank you for using Vi Status",
      });
    await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Vi's Website")
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
