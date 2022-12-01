const axios = require("axios");

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const helix = axios.create({
  baseURL: "https://api.twitch.tv/helix/",
  headers: { "Client-ID": process.env.T_CLIENT_ID },
});

async function getChannel() {
  const {
    data: { data },
  } = await helix.get(`streams?user_login=xeppaa`, {
    headers: {
      Authorization: `Bearer ${process.env.AT}`,
      "Client-ID": process.env.T_CLIENT_ID,
    },
  });
  return (
    {
      name: data[0].user_name,
      game: data[0].game_name,
      thumbnail: data[0].thumbnail_url
        .replace("{width}", "400")
        .replace("{height}", "250"),
      type: data[0].type,
      viewers: data[0].viewer_count,
      title: data[0].title,
    } || null
  );
}

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
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("announcelive")
    .setDescription("send live notification to channel you specify")

    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const _ = await getChannel();
    const channel = interaction.options.getChannel("channel");
    const embed = new EmbedBuilder()
      .setAuthor({
        iconURL: `${client.user.displayAvatarURL()}`,
        name: `${_.name} is now LIVE`,
        url: `https://twitch.tv/${_.name}`,
      })
      .setImage(`${images[Math.floor(Math.random() * images.length)]}`)
      .setColor(15548997)
      .setDescription(
        `${_.name} has gone live on twitch, please join the stream if you're not busy!

• Currently streaming: ${_.game}

• Viewer Count: ${_.viewers}

• Stream Title: ${_.title}`
      );

    let sendChannel = channel.send({
      content: "@everyone",
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Watch Stream")
            .setURL(`https://twitch.tv/${_.name}`)
            .setStyle(ButtonStyle.Link)
        ),
      ],
    });

    if (!sendChannel) {
      return interaction.reply({ content: "there was an err", ephemeral: true });
    } else {
      return interaction.reply({
        content: "live channel announced",
        ephemeral: true,
      });
    }
  },
};
