const fs = require("node:fs");
const path = require("node:path");
const { BanchoClient } = require("bancho.js");
const loadCommands = require("./load-commands.js");

module.exports = client => {
  const banchoClient = new BanchoClient({
    username: process.env.OSU_USERNAME,
    password: process.env.OSU_IRC_PASSWORD,
    apiKey: process.env.OSU_API_KEY,
  });
  loadCommands(banchoClient);
  client.banchoClient = banchoClient;

  const eventsPath = path.join(__dirname, "events");
  const eventsFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

  for (const f of eventsFiles) {
    const fPath = path.join(eventsPath, f);
    const event = require(fPath);

    if (event.once) {
      banchoClient.once(event.name, (arg) => event.execute(client, arg));
    } else {
      banchoClient.on(event.name, (arg) => event.execute(client, arg));
    }
  }
};