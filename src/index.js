require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const { startBot } = require("./functions/util/index.js");
const axios = require("axios");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
});

(async () => await startBot(client))();

const helix = axios.create({
  baseURL: "https://api.twitch.tv/helix/",
  headers: { "Client-ID": process.env.T_CLIENT_ID },
});

async function getChannel(client) {
  if (client.guilds.cache.size == 0) return console.log("no guilds");
  const {
    data: { data },
  } = await helix.get(`streams?user_login=curry`, {
    headers: {
      Authorization: `Bearer ${process.env.AT}`,
      "Client-ID": process.env.T_CLIENT_ID,
    },
  });

  if (!data[0]) return null;

  const dataWeNeed = {
    name: data[0].user_name,
    game: data[0].game_name,
    thumbnail: data[0].thumbnail_url
      .replace("{width}", "400")
      .replace("{height}", "250"),
    type: data[0].type,
    viewers: data[0].viewer_count,
    title: data[0].title,
  };

  const guild = client.guilds.cache.find((guild) => (guild.name = "development"));
  const channel = guild.channels.cache.get(guild.systemChannelId.toString());

  const embed = new EmbedBuilder()
    .setColor(15548997)
    .setAuthor({
      iconURL: `${client.user.displayAvatarURL()}`,
      name: `${dataWeNeed.name} is now LIVE`,
      url: `https://twitch.tv/${dataWeNeed.name}`,
    })
    .setDescription(
      `${dataWeNeed.name} is currently streaming: ${dataWeNeed.game} to ${dataWeNeed.viewers} viewers. The current title of the stream is: ${dataWeNeed.title}`
    )
    .setImage(`${dataWeNeed.thumbnail}`)
    .setTimestamp();

  channel.send({
    embeds: [embed],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Watch Stream")
          .setURL(`https://twitch.tv/${dataWeNeed.name}`)
          .setStyle(ButtonStyle.Link)
      ),
    ],
  });
}

(async () => {
  setInterval(async () => {
    await getChannel(client);
  }, 5000);
})();

// 420000;
