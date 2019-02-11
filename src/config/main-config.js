require("dotenv").config();
const bodyParser = require("body-parser");

module.exports = {
  init(app, express) {
    app.use(bodyParser.urlencoded({ extended: true }));
  }
};
