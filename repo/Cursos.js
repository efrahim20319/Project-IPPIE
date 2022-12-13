const database = require("../database/models")

export default class Cursos {
    static async listarCursos() {
        return await database.Cursos.findAll({ raw: true })
    }
}