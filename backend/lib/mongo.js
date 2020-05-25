const mongoose = require("mongoose");
const { config } = require("../config");
const { dbUser, dbPassword, dbHost, dbName } = config;
const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${dbHost}/${dbName}?retryWrites=true`;

class MongoLib {
  constructor() {
    console.log("MONGO_URI", MONGO_URI);
    this.dbName = dbName;
  }
  connect() {
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((db) => {
        console.log("connect to DB");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
}

module.exports = MongoLib;
