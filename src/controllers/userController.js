const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        res.status(500).json(err.errors[0].message);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({ id: user.id, username: user.email });
        });
      }
    });
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (req.user) {
        req.flash("notice", "You've successfully signed in!");
        res.json({ id: req.user.id, username: req.user.email });
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.json({ success: true });
  }
};
