import { Router } from "express"
import { rotasCursos } from "./rotasCursos"

const roteador = Router()

roteador.get("/", (req, res) => {
    res.render("home")
})

roteador.use("/cursos", rotasCursos)

roteador.use((_req, res) => {
    // rota para página não encontrada, ou seja, tem que ser o último middleware a ser passado na requisição
    res.status(404).render("tela-404");
  });
export default roteador