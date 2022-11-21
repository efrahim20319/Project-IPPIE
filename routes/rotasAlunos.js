const { Router } = require("express")
import Aluno from "../controller/Alunos"
import uploads from "../infrastructure/uploads"
const roteadorAluno = Router()
const upload = uploads()

roteadorAluno.route("/alunos")
    .post(upload.array("files", 3), Aluno.criarAluno)

export default roteadorAluno