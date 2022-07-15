const express = require("express");
const app = express()

app.set("view engine", "ejs")
app.use("/public", express.static("./public"))


module.exports = app