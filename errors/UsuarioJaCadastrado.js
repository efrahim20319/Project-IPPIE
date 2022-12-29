export default class UsuarioJaCadastrado extends Error {
    constructor(campo, valor) {
        const mensagem = `O usuario de ${campo} ${valor} já foi cadastrado`
        super(mensagem)
        this.name = "Usuario ja Cadastrado"
        this.idErro = 3
        this.campoRepetido = campo
    }
}