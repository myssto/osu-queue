module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "maps",
    {
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bm_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      json_data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};