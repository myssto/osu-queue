module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "queues",
    {
      guild_id: DataTypes.STRING,
      queue_id: DataTypes.STRING,
      name: DataTypes.STRING,
      queue_config: DataTypes.JSON,
    },
    { timestamps: false },
  );
};