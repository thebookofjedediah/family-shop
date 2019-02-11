module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const itemRoutes = require("../routes/items");

    app.use(staticRoutes);
    app.use(itemRoutes);
  }
};
