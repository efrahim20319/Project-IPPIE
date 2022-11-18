export default class UsuarioNaoEncontrado extends Error {
    constructor(info = { idEnviado, emailEnviado }) {
        let key, value
        if (info.idEnviado) {
            key = "ID"
            value = info.idEnviado
        } if (info.emailEnviado) {
            key = "e-mail"
            value = info.emailEnviado
        }
        super(`Usuario de ${key} ${value} não foi encontrado!`)
        this.name = "Usuario não encontrado"
        this.idErro = 5
    }
}