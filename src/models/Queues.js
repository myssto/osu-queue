module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "queues",
    {
      guild_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      queue_config: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};