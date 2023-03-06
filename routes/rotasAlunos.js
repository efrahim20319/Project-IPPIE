import { Router } from "express"
import Aluno from "../controller/Alunos"
import carregaImagem from "../middlewares/middlewareCarregaImg"
const roteadorAluno = Router()


roteadorAluno.route("/alunos")
    .post(carregaImagem.matricula(4), Aluno.criarAluno)

roteadorAluno.route('/alunos/comprovativo')
    .post(carregaImagem.comprovativo(1), Aluno.enviarCertificado)

roteadorAluno.route('/alunos/email/:email')
    .get(Aluno.pegarPorEmail)

export default roteadorAluno