module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "queue_players",
    {
      discord_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      osu_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guild_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbanned: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      ban_duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      mmr: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      losses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      matches_played: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: false },
  );
};