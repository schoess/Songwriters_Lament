module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define("Song", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    inspiration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lyrics: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Song.associate = function(models) {
    models.Song.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Song;
};
