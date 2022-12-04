export default class InvalidArgumentError extends Error {
    constructor(mensagem) {
        super(mensagem)
        this.name = "Erro de Argumento Invalido"
        this.idErro = 7
    }
}