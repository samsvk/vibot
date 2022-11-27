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
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .setRequired(true)
    )
    .setDescription("Replies with Vivixstar's social media platforms"),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");

    const embed = new EmbedBuilder()
      .setColor(15548997)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setAuthor({
        name: "Follow Vivixstar everywhere!",
        url: "https://vivixstar.com/",
      })
      .setDescription(
        `Vi's website contains a studio display to showcase her amazing art. It also has an information page, and a price calculator if you're intersted in commissioning her!

        Follow Vi on twitter to get early access to commissions, and see her art first!

Vi will begin uploading tutorials and timelapses soon, subcribe to her YouTube for a cookie.`
      );
    let sendChannel = channel.send({
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

    if (!sendChannel) {
      return interaction.reply({ content: "there was an err", ephemeral: true });
    } else {
      return interaction.reply({
        content: "socials sent",
        ephemeral: true,
      });
    }
  },
};
