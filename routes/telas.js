import { Router } from "express"

const roteador = Router()

roteador.get("/", (req, res) => {
    res.render("home")
})

//rotas cursos
const rotasCursos = Router()
rotasCursos.get("/eletricidade-baixa-tensao", (req, res) => {
    res.status(200).render("eletricidade-baixa-tensao")
})

rotasCursos.get("/informatica-tecnica", (req, res) => {
    res.status(200).render("informatica-tecnica")
})

rotasCursos.get("/gestao-sistemas", (req, res) => {
    res.status(200).render("gestao-sistemas")
})

rotasCursos.get("/metalomecanica-torneiro", (req, res) => {
    res.status(200).render("metalomecanica-torneiro")
})
rotasCursos.get("/maquinas-motores", (req, res) => {
    res.status(200).render("maquinas-motores")
})

roteador.use("/cursos", rotasCursos)

export default roteador