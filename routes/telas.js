const { Router } = require("express")

const roteador = Router()

roteador.get("/", (req, res) => {
    res.render("index")
})

//rotas cursos
const rotasCursos = Router()
rotasCursos.get("/eletricidade-baixa-tensao", (req, res) => {
    res.status(200).render("eletricidade-baixa-tensao")
})
rotasCursos.get("/nome-do-curso-1", (req, res) => {
    res.status(200).render("route-1")
})
rotasCursos.get("/nome-do-curso-2", (req, res) => {
    res.status(200).render("route-2")
})
rotasCursos.get("/nome-do-curso-3", (req, res) => {
    res.status(200).render("route-3")
})

roteador.use("/cursos", rotasCursos)

module.exports = roteador