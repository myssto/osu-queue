module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "queue_players",
    {
      discord_id: DataTypes.STRING,
      guild_id: DataTypes.STRING,
      queue_id: DataTypes.STRING,
      osu_id: DataTypes.STRING,
      mmr: DataTypes.INTEGER,
      wins: DataTypes.INTEGER,
      losses: DataTypes.INTEGER,
    },
    { timestamps: false },
  );
};