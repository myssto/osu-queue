const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a number")
    .addIntegerOption(option => option.setName("range").setDescription("(Default: 100) What range to roll from").setMinValue(2))
    .addStringOption(option => option.setName("text").setDescription("What are you rolling for? (Doesn't effect roll outcome)").setMaxLength(50))
    .addBooleanOption(option => option.setName("ephemeral").setDescription("(Default: false) Roll outcome will only be visible to you")),
  async execute(interaction) {
    const username = ("member" in interaction) ? interaction.member.displayName : interaction.user.displayName;

    let range = interaction.options.getInteger("range");
    const rangetext = range ? ` ${range}` : " ";
    range ??= 100;
    const result = Math.floor(Math.random() * (range)) + 1;

    let text = interaction.options.getString("text");
    text ??= "";

    let ephemeral = interaction.options.getBoolean("ephemeral");
    ephemeral ??= false;

    const baseEmbed = interaction.client.defaultEmbed();
    baseEmbed.setDescription(`!roll${rangetext} ${text}\n${username} rolls ${result} point(s)`);
    interaction.reply({ embeds: [baseEmbed], ephemeral: ephemeral });
  },
};