import RepositorioMensagem from "../repo/Mensagem";

export default class Mensagens {
    static async listarMensagens() {
        const mensagens = await RepositorioMensagem.listarMensagens()
        return mensagens
    }

    static async pegarPorId(id) {
        const mensagem = await RepositorioMensagem.pegarPorId(id)
        return mensagem
    }
}