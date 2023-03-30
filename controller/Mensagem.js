import Mensagens from "../model/Mensagens"
import RepositorioMensagem from "../repo/Mensagem"

export default class ControladorMensagem {
    static async adicionarMensagem(req, res, next) {
        try {
            const { nome, email, mensagem } = req.body
            await RepositorioMensagem.adicionarMensagem({ nome, email, mensagem })
            res.status(200).end()
        } catch (erro) {
            next(erro)
        }
    }

    static async listarMensagens(req, res, next) {
        try {
            const mensagem = await Mensagens.listarMensagens()
            return res.status(200).json(mensagem)
        } catch (error) {
            next(error)
        }
    }

    static async pegarPorId(req, res, next) {
        try {
            const id = req.params.id
            const mensagem = await Mensagens.pegarPorId(id)
            return res.status(200).json(mensagem)
        } catch (error) {
            next(error)
        }
    }
}