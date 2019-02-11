const itemQueries = require("../db/queries.items.js");

module.exports = {
  index(req, res, next) {
    itemQueries.getAllItems((err, items) => {
      if (err) {
        res.json({ status: "500" });
      } else {
        res.json(items);
      }
    });
  },
  create(req, res, next) {
    let newItem = {
      title: req.body.title
    };

    itemQueries.addItem(newItem, (err, item) => {
      if (err) {
        res.json({ status: "500" });
      } else {
        res.json(item);
      }
    });
  },
  destroy(req, res, next) {
    itemQueries.deleteItem(req, (err, item) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  }
};
