const database = require("../database/models")

export default class AlunoRepo {
    static async adiciona(dados) {
        await database.Alunos.create(dados)
    }

    static async pegarPorEmail(email) {
        return await database.Alunos.findOne({
            where: {
                email
            },
            raw: true
        })
    }
} 