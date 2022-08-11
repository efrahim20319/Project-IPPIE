export default class EmailJaCadastrado extends Error {
    constructor(email) {
        const mensagem = `O email ${email} já foi cadastrado`
        super(mensagem)
        this.name = "Email já Cadastrado"
        this.idErro = 3
    }
}