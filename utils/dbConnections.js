const mongoose = require("mongoose");
const config = require("../config/database.config");
const logger = require("../config/logger");

const dbConn = mongoose.createConnection(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

dbConn
  .then(() => {
    logger.info("Connection to db successful");
  })
  .catch(err => {
    logger.error("[FAILED] Connection to Payment db failed", err);
  });

module.exports = {
  dbConn
};
