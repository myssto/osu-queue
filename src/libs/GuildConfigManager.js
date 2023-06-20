const { Collection } = require("discord.js");

class GuildConfigManager {
  guilds = new Collection();

  authTimeout = 300;

  constructor() {
    this.init();
  }

  async init() {
    return;
  }


}

module.exports = GuildConfigManager;