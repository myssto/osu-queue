module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      discord_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      osu_id: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};