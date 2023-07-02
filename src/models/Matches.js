module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "matches",
    {
      mp_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guild_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      queue_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      match_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mp_log: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      match_config: DataTypes.JSON,
      match_data: DataTypes.JSON,
    },
    { timestamps: false },
  );
};