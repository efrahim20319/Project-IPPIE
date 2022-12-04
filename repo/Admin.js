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

    static async pegarPorEmail(email) {
        try {
            return await database.Administradores.findOne({
                where: {
                    email
                }
            })
        } catch (error) {
            throw new SQLError(error.message)
        }
    }

    static async pegarPorId(id) {
        try {
            return await database.Administradores.findByPk(id)
        } catch (error) {
            throw new SQLError(error.message)
        }
    }
}