const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");

module.exports = (client, clear = false) => {
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, "commands");

  if (clear) clearRequireCache(commandsPath);
  readCommands(commandsPath, client);
};

function clearRequireCache(dir) {
  const comfiles = fs.readdirSync(dir);
  for (const f of comfiles) {
    const fPath = path.join(dir, f);
    const stat = fs.lstatSync(fPath);

    if (stat.isDirectory()) {
      clearRequireCache(fPath);
    } else if (f.endsWith(".js")) {
      try {
        delete require.cache[fPath];
      } catch (e) {
        console.log(e);
        return;
      }
    }
  }
}

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