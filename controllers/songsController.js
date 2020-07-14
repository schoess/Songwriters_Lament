// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

// const router = express.Router();

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/members",
      failureRedirect: "/login"
    }),
    (req, res) => {
      // app.post("/api/login", (req, res) => {
      // Sending back a password, even a hashed password, isn't a good idea
      console.log("===================");
      console.log(req.user);
      // res.json(req.body.artistName);
      res.json({
        id: req.user.id,
        username: req.user.artistName
      });
    }
  );

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.Artist.create({
      artistName: req.body.artistName,
      password: req.body.password
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
    res.redirect("/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's name and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        artistName: req.user.artistName,
        id: req.user.id
      });
      console.log(req.user);
      console.log(req.user.id);
      console.log(req.user.artistName);
    }
  });

  // getting lyrics
  app.get("/api/lyrics", (req, res) => {
    db.Song.findAll({})
      .then(dbSong => {
        console.log(dbSong);
        res.json(dbSong);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/lyrics", (req, res) => {
    console.log(req.body[0]);
    db.Song.create({
      title: req.body.title,
      genre: req.body.genre,
      lyrics: req.body.lyrics,
      inspiration: req.body.inspiration,
      notes: req.body.notes,
      ArtistId: req.body.ArtistId
    })
      .then(dbSong => {
        res.json(dbSong);
      })
      .catch(err => {
        res.status(401).json(err);
      });

      // res.status("204").end();
  });

  // Search for songs from a specific artist then provides JSON
  // app.post("/api/:id?", (req, res) => {
  //   db.Song.findAll({
  //     where: {
  //       artistID: req.params.id
  //     }
  //   }).then(songs => {
  //     console.log("post", songs);
  //     return res.json(songs);
  //   });
  // });
};
