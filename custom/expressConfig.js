const express = require("express");
const app = express()

app.set("view engine", "ejs")
app.use("/public", express.static("./public")) // arquivos estaticos na pasta public, acessados na rota /public
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
module.exports = app