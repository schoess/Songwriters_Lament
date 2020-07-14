module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define("Song", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true
      }
    },
    inspiration: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true
      }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true
      }
    },
    lyrics: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true
      }
    },
    artistID: {
      type: DataTypes.INTEGER,
      references: {
        model: "artists",
        key: "id"
      }
    }
  });

  return Song;
};
