// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// Handlebars requires
const express = require("express");
const router = express.Router();
// requiring js files in models
const database = require("../models/song");


module.exports = function(app) {
  /* Attempts at handlebars */
  router.get("/", function(req, res){
    database.all(function (data){
      let hbsObject = {
        Song: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });



  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    console.log(req.body.artistName);
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.Artist.create({
      artistName: req.body.artistName
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Storing lyrics to the DB
  app.post("/api/store_lyrics", (req,res) => {
    db.Song.create ({
      title: req.body.title,
      genre: req.body.genre,
      lyrics: req.body.lyrics,
      inspiration: req.body.inspiration,
      notes: req.body.notes,

    });
  });

  // Gets all lyrics

  app.get("/api/get_lyrics", (req,res) => {
    db.Song.findAll({}).then(function(dbSongs) {
      res.json(dbSongs);
    });
  });
 
  //Deletes lyrics

  app.delete("/api/lyric/:id", function(req,res) {
    db.Song.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSong) {
      res.json(dbSong);
    });
  });

  //Updates Lyrics

  app.put("/api/update_lyric", function(req,res) {
    db.Song.update({
      title: req.body.title,
      genre: req.body.genre,
      lyrics: req.body.lyrics,
      inspiration: req.body.inspiration,
      notes: req.body.notes,
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbSong) {
      res.json(dbSong);
    })
    .catch(function(err) {
      res.json(err);
    })
  })
};

