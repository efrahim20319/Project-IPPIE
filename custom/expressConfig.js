const express = require("express");
const bodyParser = require("body-parser")
const app = express()

app.set("view engine", "ejs")
app.use("/public", express.static("./public")) // arquivos estaticos na pasta public, acessados na rota /public
app.use(bodyParser.json()) // aceitar requisições com o corpo escrito em json
app.use(bodyParser.urlencoded({ extended: true })) // aceitar requisições com o corpo em urlencoded

module.exports = app