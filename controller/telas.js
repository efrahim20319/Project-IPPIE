const roteador = require("express").Router()

roteador.get("/", (req, res) => {
    res.render("index")
})
roteador.get("/curso-de-eletricidade", (req, res)=>{
    res.render("curso-de-eletricidade")
})

module.exports = roteador