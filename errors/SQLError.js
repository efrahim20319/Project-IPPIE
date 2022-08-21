export default class SQLError extends Error {
    constructor(mensagem) {
        super(mensagem)
        this.name = "SQL Error"
        this.idErro = 6
    }
}