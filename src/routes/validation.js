module.exports = {
  validateItems(req, res, next) {
    if (req.method === "POST") {
      req
        .checkBody("content", "must be at least 2 characters in length")
        .isLength({ min: 2 });
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
