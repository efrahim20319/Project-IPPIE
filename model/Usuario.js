import erros from "../errors"
import Repositorio from "../repo/Usuario"
export default class Usuario {
    constructor(nome, email, numero_telefone, emailVerificado = false) {
        this.id = Number()
        this.nome = nome
        this.email = email
        this.numero_telefone = numero_telefone
        this.emailVerificado = emailVerificado
    }

    async valida(options_default = { BloquearNaAusencia: true, BloquearEmailCadastrado: true }) {
        const options = Object.assign({ BloquearNaAusencia: true, BloquearEmailCadastrado: true }, options_default);
        this.verificarAusencia(options)
        await this.verificarEmailCadastrado(options)
        this.verificarMaTextuacao()
    }

    verificarMaTextuacao() {
        const emailPattern = /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/
        const nomePattern = /^([A-Za-zÃÕÁÉÍÓÚÂÊÎÔÛÇãõáéíóúâêîôûç]{2,60})([\sA-Za-zÃÕÁÉÍÓÚÂÊÎÔÛÇãõáéíóúâêîôûç]{2,60})*$/
        const telefonePattern = /^(\+244\s{0,2})?(9\d{2}([-\s]?)\d{3}(\3)\d{3})$/
        if (this.nome && !nomePattern.test(String(this.nome).trim()))
            throw new erros.ErroDeFormato("Nome inválido")
        if (this.email && !emailPattern.test(String(this.email).trim()))
            throw new erros.ErroDeFormato("Formato de email invalido.")
        if (this.numero_telefone && !telefonePattern.test(String(this.numero_telefone).trim()))
            throw new erros.ErroDeFormato("Número de telefone inválido")
        if (String(this.nome).length > 150)
            throw new erros.ErroDeFormato("Nome demasiado longo")
        if (String(this.email).length > 150)
            throw new erros.ErroDeFormato("Email demasiado longo")
    }

    async verificarEmailCadastrado(options) {
        if (options.BloquearEmailCadastrado) {
            const email = String(this.email).trim()
            const usuario = await Usuario.pegarPorEmail(email, { BloquearNaAusencia: false })
            if (usuario)
                throw new erros.EmailJaCadastrado(email)
        }
    }

    verificarAusencia(options) {
        if (options.BloquearNaAusencia) { //Condicao para disparar erros casos na ausencia de dados
            if (!this.nome)
                throw new erros.DadosEmFalta("nome")
            if (!this.email)
                throw new erros.DadosEmFalta("email")
            if (!this.numero_telefone)
                throw new erros.DadosEmFalta("numero de telefone")
        }
    }

    async adiciona() {
        const dados = {
            nome: String(this.nome).trim(),
            email: String(this.email).trim(),
            numero_telefone: String(this.numero_telefone).trim(),
            emailVerificado: this.emailVerificado
        }
        await Repositorio.adiciona(dados)
        const dadosRetornados = await Repositorio.pegarPorEmail(this.email)
        const { id } = dadosRetornados
        this.id = id
    }

    static async pegarPorId(idEnviado) {
        const dados = await Repositorio.pegarPorId(idEnviado)
        if (!dados) throw new erros.UsuarioNaoEncontrado('ID', idEnviado)
        const { nome, email, numero_telefone, emailVerificado, id } = dados
        const usuario = new Usuario(nome, email, numero_telefone, emailVerificado)
        usuario.id = id
        return usuario
    }

    static async deleta(id) {
        await Usuario.pegarPorId(id) //Verificar se o usuario existe
        await Repositorio.deleta(id)
    }

    async modificaEmailEnviado() {
        this.emailVerificado = true
        Repositorio.modificaEmailVerificado(this.email)
    }

    async atualiza(id) {
        await Usuario.pegarPorId(id)
        const dados = Object.values(this)
        const props = Object.keys(this)
        const indiceEmailVerificado = props.indexOf("emailVerificado")
        const dadosParaAtualizar = {}
        for (const indice in dados) {
            if (indice == indiceEmailVerificado) continue //Isso porque, senão estará a atualizar o campo emailVerificado Desnecessariamente
            let dado = dados[indice]
            if (dado) {
                dadosParaAtualizar[`${props[indice]}`] = dado
                this[`${props[indice]}`] = dado
            }
        }
        if (!(Object.keys(dadosParaAtualizar).length)) throw new erros.DadosEmFalta()
        await this.valida({ BloquearNaAusencia: false })
        await Repositorio.atualiza(dadosParaAtualizar, id)
    }

    static async lista() {
        return await Repositorio.lista()
    }

    static async pegarPorEmail(emailEnviado, options_default = { BloquearNaAusencia: true }) {
        const options = Object.assign({ BloquearNaAusencia: true }, options_default)
        const dados = await Repositorio.pegarPorEmail(emailEnviado)
        if (!dados && options.BloquearNaAusencia) throw new erros.UsuarioNaoEncontrado('Email', emailEnviado)
        if (!dados) return undefined
        const { nome, email, numero_telefone, emailVerificado, id } = dados
        const usuario = new Usuario(nome, email, numero_telefone, emailVerificado)
        usuario.id = id
        return usuario
    }
}