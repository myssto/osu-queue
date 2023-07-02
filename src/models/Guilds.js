module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "guilds",
    {
      guild_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      staff_roles: { type: DataTypes.STRING },
      banned_users: { type: DataTypes.STRING },
    },
    { timestamps: false },
  );
};