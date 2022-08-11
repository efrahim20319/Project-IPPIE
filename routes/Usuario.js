import { Router } from "express"
const roteador = Router()
import { criarUsuario, listarUsuarios, obterPorID, deletarPorID, atualizarPorID, obterPorEmail } from "../controller/Usuario"

roteador.route("/usuario")
    .post(criarUsuario)
    .get(listarUsuarios)

roteador.route(/^\/usuario\/(\d+)$/)
    .get(obterPorID)
    .delete(deletarPorID)
    .put(atualizarPorID)

roteador.route(/^\/usuario\/email\/(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/)
    .get(obterPorEmail)

export default roteador