const roteador = require("express").Router()
const usuarioControlador = require("../controller/Usuario")

roteador.route("/usuario")
    .post(usuarioControlador.criarUsuario)
    .get(usuarioControlador.listarUsuarios)

roteador.route(/^\/usuario\/(\d+)$/)
    .get(usuarioControlador.obterPorID)
    .delete(usuarioControlador.deletarPorID)
    .put(usuarioControlador.atualizarPorID)

roteador.route(/^\/usuario\/email\/(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/)
    .get(usuarioControlador.obterPorEmail)

module.exports = roteador