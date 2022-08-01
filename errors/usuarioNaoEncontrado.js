module.exports = class UsuarioNaoEncontrado extends Error {
    constructor(info = { id, email }) {
        let key, value
        if (info.id) {
            key = "ID"
            value = info.id
        } if (info.email) {
            key = "e-mail"
            value = info.email
        }
        super(`Usuario de ${key} ${value} não foi encontrado!`)
        this.name = "Usuario não encontrado"
        this.idErro = 5
    }
}