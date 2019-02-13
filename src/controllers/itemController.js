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
    itemQueries.deleteItem(req.params.id, (err, item) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  },
  edit(req, res, next) {
    itemQueries.getItem(req.params.id, (err, item) => {
      if (err || item == null) {
        res.json({ success: false });
      } else {
        res.json(item);
      }
    });
  },
  update(req, res, next) {
    itemQueries.updateItem(req.params.id, req.body, (err, item) => {
      if (err || item == null) {
        res.json({ success: false });
      } else {
        res.json(item);
      }
    });
  },
  setPurchase(req, res, next) {
    itemQueries.updateItem(req.params.id, req.body, (err, item) => {
      if (err || item == null) {
        res.json({ success: false });
      } else {
        res.json(item);
      }
    });
  }
};
