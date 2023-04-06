const database = require("../database/models/index")
export class SuperAdminRepo {


    static async adiciona({ nome, senha }) {
        try {
            await database.SuperAdministradores.create({ nome, senha })
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

