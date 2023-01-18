import { Router } from "express"
import Aluno from "../controller/Alunos"
import carregaImagem from "../middlewares/middlewareCarregaImg"
const roteadorAluno = Router()

roteadorAluno.route("/alunos")
    .post(carregaImagem(), Aluno.criarAluno)

roteadorAluno.route('/alunos/email/:email')
    .get(Aluno.pegarPorEmail)

export default roteadorAluno