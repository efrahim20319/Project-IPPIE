const database = require("../database/models/index")
export class SuperAdminRepo {


    static async adiciona({ nome, senha }) {
        try {
            await database.SuperAdministradores.create({ nome, senha })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async obterSuperAdmin() {
        try {
            return await database.SuperAdministradores.findOne({})
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

