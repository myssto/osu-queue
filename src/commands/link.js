const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Link your Osu and Discord profiles to use this bot"),
  async execute(interaction) {
    await interaction.client.usrManager.auth(interaction);
  },
};