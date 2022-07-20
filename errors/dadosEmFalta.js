module.exports = class DadosEmFalta extends Error {
    constructor(campo) {
        super(`Campo ${campo} não foi enviado`)
        this.name = "Dados em falta"
    }
}