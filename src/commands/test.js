const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("pls work"),
  devOnly: true,
  async execute(interaction) {
    interaction.reply("I am working");
  },
};