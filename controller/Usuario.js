const roteador = require("express").Router()
const Usuario = require("../model/Usuario")


roteador.route("/usuario")
    .post(async (req, res) => { //rota para cadastrar usuario, não vi necessidade de encriptar os dados
        try {
            const { nome, email, numero_telefone } = req.body
            const usuario = new Usuario(nome, email, numero_telefone)
            usuario.valida()
            await usuario.adiciona()
            res.status(200).end()
        } catch (erro) {
            res.status(400).json({erro: erro.message})
        }
    })
    .get(async (req, res) => {
        const dados = await Usuario.lista()
        res.status(200).json(dados)
    })



roteador.route(/^\/usuario\/(\d+)$/)
    .get(async (req, res) => {
        const id = Number(req.params[0])
        const dados = await Usuario.pegarPorId(id)
        res.status(200).json(dados)
    })
    .delete(async (req, res) => {
        const id = Number(req.params[0])
        await Usuario.deleta(id)
        res.status(204).end()
    })
    .put(async (req, res) => {
        const id = Number(req.params[0])
        const dados = req.body
        await Usuario.atualiza(dados, id)
        res.status(204).end()
    })

module.exports = roteador