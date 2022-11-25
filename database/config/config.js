require("dotenv").config()

module.exports = {
  "development": {
    "username": process.env.DBASE_USER,
    "password": process.env.DBASE_PASS,
    "database": process.env.DBASE_NAME,
    "host": process.env.DBASE_HOST,
    "dialect": process.env.DBASE_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
