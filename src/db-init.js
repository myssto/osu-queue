// const fs = require("node:fs");
// const path = require("node:path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "db.sqlite",
});

// const modelsPath = path.join(__dirname, "models");
// const files = fs.readdirSync(modelsPath);
// for (const f of files) {
//   if (f.endsWith(".js")) {
//     const fPath = path.join(modelsPath, f);
//     require(fPath)(sequelize, sequelize.DataTypes);
//   }
// }
require("./models/Guilds.js")(sequelize, Sequelize.DataTypes);
require("./models/Mappools.js")(sequelize, Sequelize.DataTypes);
require("./models/Maps.js")(sequelize, Sequelize.DataTypes);
require("./models/Matches.js")(sequelize, Sequelize.DataTypes);
require("./models/QueuePlayers.js")(sequelize, Sequelize.DataTypes);
require("./models/Queues.js")(sequelize, Sequelize.DataTypes);
require("./models/Users.js")(sequelize, Sequelize.DataTypes);
const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    console.log("Database synced");
    sequelize.close();
  })
  .catch(console.error);