const repositorio = require("../repo/Usuario")

module.exports = class Usuario {
    constructor(nome, email, numero_telefone) {
        this._nome = nome
        this._email = email
        this._numero_telefone = numero_telefone
    }

    get nome() {
        return this._nome
    }
    get email() {
        return this._email
    }
    get numero_telefone() {
        return this._numero_telefone
    }

    async adiciona() {
        const dados = {
            nome: this.nome,
            email: this.email,
            numero_telefone: this.numero_telefone
        }
        await repositorio.adiciona(dados)
    }

    static async pegarPorId(id) {
        return await repositorio.pegarPorId(id)
    }

    static async deleta(id) {
        await repositorio.deleta(id)
    }

    static async atualiza(dados, id) {
        await repositorio.atualiza(dados, id)
    }

    static async lista() {
        return await repositorio.lista()
    }
}