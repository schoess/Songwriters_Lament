const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const Artist = sequelize.define("Artist", {
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Artist.associate = function(models) {
    models.Artist.hasMany(models.Song, {
      onDelete: "CASCADE"
    });
  };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Artist.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Artist.addHook("beforeCreate", artist => {
    artist.password = bcrypt.hashSync(
      artist.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Artist;
};
