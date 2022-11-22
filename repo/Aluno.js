const database = require("../database/models")

export default class AlunoRepo {
    static async adiciona(dados) {
        await database.Alunos.create(dados)
    }
} 