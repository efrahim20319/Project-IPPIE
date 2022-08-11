import { Router } from "express"

const roteador = Router()

roteador.get("/", (req, res) => {
    res.render("index")
})

//rotas cursos
const rotasCursos = Router()
rotasCursos.get("/eletricidade-baixa-tensao", (req, res) => {
    res.status(200).render("eletricidade-baixa-tensao")
})

roteador.use("/cursos", rotasCursos)

export default roteador