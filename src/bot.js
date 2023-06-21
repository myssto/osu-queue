require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits } = require("discord.js");
const loadCommands = require("./load-commands.js");
const initBancho = require("./osu/osu.js");
const UsersManager = require("./libs/UsersManager.js");
const GuildConfigManager = require("./libs/GuildConfigManager.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildEmojisAndStickers],
  rest: {
    timeout: 80_000,
  },
});

loadCommands(client);
initBancho(client);
client.usrManager = new UsersManager(client);
client.guildConfigManager = new GuildConfigManager(client);

const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

for (const f of eventsFiles) {
  const fPath = path.join(eventsPath, f);
  const event = require(fPath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);