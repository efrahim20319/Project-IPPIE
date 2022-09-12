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
}