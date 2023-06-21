const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "db.sqlite",
});

const Users = require("./models/Users.js")(sequelize, Sequelize.DataTypes);
const Guilds = require("./models/Guilds.js")(sequelize, Sequelize.DataTypes);
const Matches = require("./models/Matches.js")(sequelize, Sequelize.DataTypes);
const Queues = require("./models/Queues.js")(sequelize, Sequelize.DataTypes);
const QueuePlayers = require("./models/QueuePlayers.js")(sequelize, Sequelize.DataTypes);

Guilds.hasMany(Queues, { as: "queues" });
Queues.belongsTo(Guilds);
Queues.hasMany(QueuePlayers, { as: "players" });
QueuePlayers.belongsTo(Queues);
Queues.hasMany(Matches, { foreignKey: "mp_id", as: "matches" });
Matches.belongsTo(Queues);

module.exports = {
  Users,
  Guilds,
  Matches,
  Queues,
  QueuePlayers,
};