module.exports = function(sequelize, DataTypes) {
  const Artist = sequelize.define("Artist", {
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  });

  return Artist;
};
