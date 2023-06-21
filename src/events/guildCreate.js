const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildCreate,
  once: false,
  execute(guild) {
    console.log(`Joined new guild: ${guild.name} with id: ${guild.id}`);
    guild.client.guildConfigManager.newGuild(guild.id);
  },
};