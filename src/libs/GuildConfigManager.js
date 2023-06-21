const { Collection } = require("discord.js");
const { Guilds } = require("../db-objects.js");

class GuildConfigManager {
  guilds = new Collection();

  constructor(client) {
    this.client = client;
    this.init();
  }

  async init() {
    const guilds = await Guilds.findAll();
    for (const guild of guilds) {
      this.guilds.set(guild.guild_id, guild);
    }
  }

  async newGuild(guildId) {
    if (this.guilds.get(guildId)) return;
    const newGuild = Guilds.create({ guild_id: guildId });
    this.guilds.set(newGuild.guild_id, newGuild);
  }
}

module.exports = GuildConfigManager;