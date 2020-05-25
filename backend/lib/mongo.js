const mongoose = require("mongoose");
const { config } = require("../config");
const { dbUser, dbPassword, dbHost, dbName } = config;
const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${dbHost}/?=authSource=${dbName}`;

class MongoLib {
  constructor() {
    console.log("MONGO_URI", MONGO_URI);
    this.dbName = dbName;
  }
}

module.exports = MongoLib;
