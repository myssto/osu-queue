module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "mappools",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guild_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pool_data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};