const executaQuery = require("../database/executaQuery");

module.exports = class Usuario {
    static async adiciona(dados) {
        const query = "INSERT INTO Usuario SET ?"
        await executaQuery(query, dados)
    }

    static async pegarPorId(id) {
        const query = "SELECT * FROM Usuario WHERE codigo = ?"
        return await executaQuery(query, id)
    }

    static async deleta(id) {
        const query = "DELETE FROM Usuario WHERE codigo = ?"
        await executaQuery(query, id)
    }

    static async atualiza(dados, id) {
        const query = "UPDATE Usuario SET ? WHERE codigo = ?"
        await executaQuery(query, [dados, id])
    }

    static async lista() {
        const query = "SELECT codigo, nome, email, numero_telefone FROM Usuario;"
        return await executaQuery(query)
    }

    static async pegarPorEmail(email) {
        const query = "SELECT * FROM Usuario WHERE email = ? LIMIT 1"
        return await executaQuery(query, email)
    }
}