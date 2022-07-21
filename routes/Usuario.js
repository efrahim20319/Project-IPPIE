const roteador = require("express").Router()
const usuarioControlador = require("../controller/Usuario")

roteador.route("/usuario")
    .post(usuarioControlador.criarUsuario)
    .get(usuarioControlador.listarUsuarios)

roteador.route(/^\/usuario\/(\d+)$/)
    .get(usuarioControlador.obterPorID)
    .delete(usuarioControlador.deletarPorID)
    .put(usuarioControlador.atualizarPorID)

module.exports = roteador