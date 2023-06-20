require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");

const isGlobal = process.argv.includes("--global") || process.argv.includes("-g");
const commands = [];

function readCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fPath = path.join(dir, f);
    const stat = fs.lstatSync(fPath);

    if (stat.isDirectory()) {
      readCommands(fPath);
    } else if (f.endsWith(".js")) {
      const c = require(fPath);

      if (!("data" in c && "execute" in c)) {
        continue;
      }

      if (isGlobal && c.devOnly) {
        continue;
      }

      commands.push(c.data.toJSON());
    }
  }
}

const commandsPath = path.join(__dirname, "commands");

readCommands(commandsPath);

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Starting deployment of ${commands.length} application commands`);

    let d;

    if (isGlobal) {
      console.log("Deploying globally...");
      d = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    } else {
      console.log("Deploying to guild...");
      d = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    }

    console.log(`Successfully deployed ${d.length} application commands`);
  } catch (e) {
    console.error(e);
  }
})();