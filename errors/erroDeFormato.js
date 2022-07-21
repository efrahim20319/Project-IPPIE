module.exports = class ErroDeFormato extends Error {
    constructor(message) {
        super(message);
        this.name = "Erro de formato"
        this.idErro = 2
    }
}