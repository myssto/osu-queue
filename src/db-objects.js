const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "db.sqlite",
});

const Guilds = require("./models/Guilds.js")(sequelize, Sequelize.DataTypes);
const Matches = require("./models/Matches.js")(sequelize, Sequelize.DataTypes);
const Mappools = require("./models/Mappools.js")(sequelize, Sequelize.DataTypes);
const Maps = require("./models/Maps.js")(sequelize, Sequelize.DataTypes);
const QueuePlayers = require("./models/QueuePlayers.js")(sequelize, Sequelize.DataTypes);
const Queues = require("./models/Queues.js")(sequelize, Sequelize.DataTypes);
const Users = require("./models/Users.js")(sequelize, Sequelize.DataTypes);

Guilds.hasMany(Queues);
Guilds.hasMany(Mappools);
Mappools.belongsTo(Guilds);
Queues.belongsTo(Guilds);
Queues.hasMany(QueuePlayers);
Queues.hasMany(Matches);
QueuePlayers.belongsTo(Queues);
Matches.belongsTo(Queues);

module.exports = {
  Guilds,
  Mappools,
  Maps,
  Matches,
  QueuePlayers,
  Queues,
  Users,
};