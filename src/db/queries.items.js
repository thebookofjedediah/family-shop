const Item = require("./models").Item;

module.exports = {
  getAllItems(callback) {
    return Item.findAll()
      .then(items => {
        callback(null, items);
      })
      .catch(err => {
        callback(err);
      });
  },
  getItem(id, callback) {
    return Item.findByPk(id)
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  },
  addItem(newItem, callback) {
    return Item.create({
      title: newItem.title
    })
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteItem(id, callback) {
    return Item.destroy({
      where: { id }
    })
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateItem(id, updatedItem, callback) {
    return Item.findByPk(id).then(item => {
      if (!item) {
        return callback("Item not found");
      }
      item
        .update(updatedItem, {
          fields: Object.keys(updatedItem)
        })
        .then(() => {
          callback(null, item);
        })
        .catch(err => {
          callback(err);
        });
    });
  },
  setItemPurchase(id, purchaseStatus, callback) {
    return Item.findByPk(id).then(item => {
      if (!item) {
        return callback("Item not found");
      }
      item.update(purchaseStatus, {
        isBought: purchaseStatus
      });
    });
  }
};
