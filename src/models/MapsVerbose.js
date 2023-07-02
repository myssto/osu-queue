module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "maps",
    {
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bmset_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bm_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diffname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bg_card: { type: DataTypes.STRING },
      mod: { type: DataTypes.STRING },
      sr: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ar: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      od: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      cs: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      hp: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      bpm: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      drain: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};