module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "guilds",
    {
      guild_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      match_configs: {
        type: DataTypes.JSON,
      },
      queues: {
        type: DataTypes.JSON,
      },
    },
    { timestamps: false },
  );
};