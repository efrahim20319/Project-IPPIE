const roteador = require("express").Router()
const Usuario = require("../model/Usuario")

roteador.post("/usuario", async (req, res) => { //rota para cadastrar usuario, não vi necessidade de encriptar os dados
    const { nome, email, numero_telefone } = req.body
    const usuario = new Usuario(nome, email, numero_telefone)
    await usuario.adiciona()
    res.end()
})

module.exports = roteador