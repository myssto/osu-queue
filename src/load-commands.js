const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");

module.exports = client => {
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, "commands");

  readCommands(commandsPath, client);
};

function readCommands(dir, client) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fPath = path.join(dir, f);
    const stat = fs.lstatSync(fPath);

    if (stat.isDirectory()) {
      readCommands(fPath, client);
    } else if (f.endsWith(".js")) {
      const c = require(fPath);

      if (!("data" in c && "execute" in c)) {
        continue;
      }

      client.commands.set(c.data.name, c);
    }
  }
}