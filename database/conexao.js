const mysql = require("mysql")
const config = require("config")

const conexao = mysql.createConnection({
    host: config.get("mysql.host"),
    database: config.get("mysql.database"),
    password: config.get("mysql.password"),
    user: config.get("mysql.user"),
    port: config.get("mysql.port")
})

module.exports = conexao