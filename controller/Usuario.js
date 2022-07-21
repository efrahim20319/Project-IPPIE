const Usuario = require("../model/Usuario")

module.exports = {
    criarUsuario: async (req, res, next) => { //rota para cadastrar usuario, não vi necessidade de encriptar os dados
        try {
            const { nome, email, numero_telefone } = req.body
            const usuario = new Usuario(nome, email, numero_telefone)
            usuario.valida()
            await usuario.adiciona()
            res.status(200).end()
        } catch (erro) {
            next(erro)
        }
    },
    listarUsuarios: async (req, res) => {
        const dados = await Usuario.lista()
        res.status(200).json(dados)
    },
    obterPorID: async (req, res) => {
        const id = Number(req.params[0])
        const dados = await Usuario.pegarPorId(id)
        res.status(200).json(dados)
    },
    deletarPorID: async (req, res) => {
        const id = Number(req.params[0])
        await Usuario.deleta(id)
        res.status(204).end()
    },
    atualizarPorID: async (req, res, next) => {
        try {
            const id = Number(req.params[0])
            const { nome, email, numero_telefone } = req.body
            const usuario = new Usuario(nome, email, numero_telefone)
            await usuario.atualiza(id)
            res.status(204).end()
        } catch (erro) {
            next(erro)
        }
    }
}