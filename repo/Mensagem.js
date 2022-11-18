const database = require("../database/models")

export default class RepositorioMensagem {
    static async adicionarMensagem(dados) {
        await database.Mensagens.create(dados)
    }
}