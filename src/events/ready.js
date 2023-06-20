const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`✅ Logged into Discord as ${client.user.tag}`);
    client.application.fetch();
  },
};