const database = require("../database/models")

export default class ProvinciasRepo {
    static async listarProvincias() {
        return await database.Provincias.findAll({ raw: true })
    }
}