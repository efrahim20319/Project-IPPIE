const roteador = require("express").Router()

roteador.get("/", (req, res) => {
    res.render("home")
})

module.exports = roteador