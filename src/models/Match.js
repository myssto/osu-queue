module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "matches",
    {
      mp_id: {
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