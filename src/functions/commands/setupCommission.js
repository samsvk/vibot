const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
} = require("discord.js");
const { menu } = require("../selectmenus/commissionselect.js");
const { streamername, color } = require("../util/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setName("setupcommission")
    .setDescription("Setup commission system.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to message")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");

    let sendChannel = channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Commission ${streamername}`)
          .setColor(color)
          .setDescription(
            `• PayPal is the only form of payment accepted and all fees must be paid upfront.

• I reserve the right to decline any request I deem inappropriate.

• Provide reference but refrain from large detail I prefer 90% creative freedom.

• All orders are final once payment is complete (No refunds)

• I am happy to keep commissions private if requested.

• No backseating or pressuring during the commission cycle.

To begin commissioning me select the following option which is applicable to your commssion and proceed with the form. Once completed I will be in contact with you via Discord to confirm if your commission has been accepted or declined. Thank you so much for the amazing support and interest in commisioning me!

Please visit: <https://www.vivixstar.com/> for my recent art as reference to my current style/techniques.
`
          ),
      ],
      components: [menu()],
    });

    if (!sendChannel) {
      return interaction.reply({ content: "there was an err", ephemeral: true });
    } else {
      return interaction.reply({
        content: "verify channel successfully set fam",
        ephemeral: true,
      });
    }
  },
};
