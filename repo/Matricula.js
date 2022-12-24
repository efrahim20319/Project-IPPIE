const database = require("../database/models")

export default class MatriculaRepo {
    static async adiciona(dados) {
        await database.Matriculas.create(dados)
    }
}