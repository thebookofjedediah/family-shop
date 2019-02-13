module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const itemRoutes = require("../routes/items");
    const userRoutes = require("../routes/users");

    app.use(staticRoutes);
    app.use(itemRoutes);
    app.use(userRoutes);
  }
};
