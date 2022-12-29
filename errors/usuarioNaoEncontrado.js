export default class UsuarioNaoEncontrado extends Error {
    constructor({ info, valor }) {
        super(`Usuario de ${info} ${valor} não foi encontrado!`)
        this.name = "Usuario não encontrado"
        this.idErro = 5
    }
}