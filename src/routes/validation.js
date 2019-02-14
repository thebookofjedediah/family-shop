module.exports = {
  validateItems(req, res, next) {
    if (req.method === "POST") {
      req
        .checkBody("title", "must be at least 2 characters in length")
        .isLength({ min: 2 });
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.status(422).json({ errors });
    } else {
      return next();
    }
  },
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("email", "must be a valid email").isEmail();
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 6 });
      req
        .checkBody("passwordConfirmation", "must match password provided")
        .optional()
        .matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.status(422).json({ errors });
    } else {
      return next();
    }
  }
};
