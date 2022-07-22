const erros = require("../errors/errors")
const repositorio = require("../repo/Usuario")
module.exports = class Usuario {
    constructor(nome, email, numero_telefone) {
        this._nome = nome
        this._email = email
        this._numero_telefone = numero_telefone
    }

    set nome(nome) {
        this._nome = nome
    }
    set email(email) {
        this._email = email
    }
    set numero_telefone(numero) {
        this._numero_telefone = numero
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

    async valida(options = { BloquearNaAusencia: true, BloquearEmailCadastrado: true }) {
        const emailPattern = /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/
        const nomePattern = /^([A-Za-zÃÕÁÉÍÓÚÂÊÎÔÛÇãõáéíóúâêîôûç]+)([\sA-Za-zÃÕÁÉÍÓÚÂÊÎÔÛÇãõáéíóúâêîôûç]+)*$/
        const telefonePattern = /^(\+244\s{0,2})?(9\d{2}([-\s]?)\d{3}(\3)\d{3})$/
        if (options.BloquearNaAusencia) { //Condicao para dispara erros casos na ausencia de dados
            if (!this.nome) throw new erros.DadosEmFalta("nome")
            if (!this.email) throw new erros.DadosEmFalta("email")
            if (!this.numero_telefone) throw new erros.DadosEmFalta("numero de telefone")
        }
        if (options.BloquearEmailCadastrado) {
            const usuario = await Usuario.pegarPorEmail(this.email)
            if (usuario.length) throw new erros.EmailJaCadastrado(this.email)
        }

        if (this.nome && !nomePattern.test(String(this.nome).trim())) throw new erros.ErroDeFormato("Nome inválido")
        if (this.email && !emailPattern.test(String(this.email).trim())) throw new erros.ErroDeFormato("Formato de email invalido.")
        if (this.numero_telefone && !telefonePattern.test(String(this.numero_telefone).trim())) throw new erros.ErroDeFormato("Número de telefone inválido")
        if (String(this.nome).length > 150) throw new erros.ErroDeFormato("Nome demaiado longo")
        if (String(this.email).length > 150) throw new erros.ErroDeFormato("Email demasiado longo")
    }

    async adiciona() {
        const dados = {
            nome: String(this.nome).trim(),
            email: String(this.email).trim(),
            numero_telefone: String(this.numero_telefone).trim()
        }
        await repositorio.adiciona(dados)
    }

    static async pegarPorId(id) {
        return await repositorio.pegarPorId(id)
    }

    static async deleta(id) {
        await repositorio.deleta(id)
    }

    async atualiza(id) {
        const dados = [this.nome, this.email, this.numero_telefone]
        const props = ["nome", "email", "numero_telefone"]
        const dadosParaAtualizar = {}
        dados.forEach((dado, indice) => {
            if (dado) {
                dadosParaAtualizar[`${props[indice]}`] = dado
                this[`${props[indice]}`] = dado
            } 
        });
        if (!(Object.keys(dadosParaAtualizar).length)) throw new erros.DadosEmFalta()
        await this.valida({ BloquearNaAusencia: false, BloquearEmailCadastrado: true })
        await repositorio.atualiza(dadosParaAtualizar, id)
    }

    static async lista() {
        return await repositorio.lista()
    }

    static async pegarPorEmail(email) {
        return await repositorio.pegarPorEmail(email)
    }
}