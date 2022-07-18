const executaQuery = require("../database/executaQuery");

module.exports = class Usuario {
    static async adiciona (dados) {
        const query = "INSERT INTO Usuario SET ?"
        await executaQuery(query, dados)
    }
}