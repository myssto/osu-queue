const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
    const baseEmbed = new EmbedBuilder().setColor("#821a99");
    // This will need to be changed to support button and menu commands
    if (!interaction.client.usrManager.userExists(interaction.user.id) && interaction.commandName !== "link") {
      baseEmbed.setDescription("You must link your osu! account before using this feature!");
      return interaction.reply({ ephemeral: true, embeds: [baseEmbed] });
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`Command ${interaction.commandName} not found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      baseEmbed.setDescription("There was an error while executing this command!");
      interaction.deffered
        ? interaction.followUp({ ephemeral: true, embeds: [baseEmbed] })
        : interaction.reply({ ephemeral: true, embeds: [baseEmbed] });
    }
  },
};