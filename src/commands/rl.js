const { SlashCommandBuilder } = require("discord.js");
const loadCommands = require("../load-commands.js");

module.exports = {
  data: new SlashCommandBuilder().setName("rl").setDescription("Reload all commands client side"),
  devOnly: true,
  async execute(interaction) {
    const { client } = interaction;
    const baseEmbed = client.defaultEmbed();
    if (interaction.user.id !== client.application.owner.id) {
      baseEmbed.setDescription("Only the bot owner can use this command");
      await interaction.reply({ embeds: [baseEmbed], ephemeral: true });
      return;
    }

    loadCommands(client, true);
    baseEmbed.setDescription("Commands reloaded");
    interaction.reply({ embeds: [baseEmbed], ephemeral: true });
  },
};