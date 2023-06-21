module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "matches",
    {
      mp_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      guild_id: DataTypes.STRING,
      queue_id: DataTypes.STRING,
      match_config: DataTypes.JSON,
      match_status: DataTypes.STRING,
      mp_log: DataTypes.TEXT,
      mp_pswd: DataTypes.TEXT,
    },
    { timestamps: false },
  );
};