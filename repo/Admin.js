import SQLError from "../errors/SQLError"

const database = require("../database/models")

export default class AdminRepo {
    static async adiciona(dados) {
        try {
            await database.Administradores.create(dados)
        } catch (error) {
            throw new SQLError(error.message)
        }
    }
}