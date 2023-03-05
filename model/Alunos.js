import errors from "../errors"
import AlunoRepo from "../repo/Aluno"

export default class Aluno {
    constructor({ nome,
        numero_BI,
        endereco,
        data_nascimento,
        nome_pai,
        nome_mae,
        numero_telefone,
        email,
        provincia_id,
        curso_id,
        foto_perfil,
        BI_img,
        certificado_img,
        comprovativo_img }
    ) {
        this.id = Number()
        this.nome = nome
        this.numero_BI = numero_BI
        this.endereco = endereco
        this.data_nascimento = data_nascimento
        this.nome_pai = nome_pai
        this.nome_mae = nome_mae
        this.numero_telefone = numero_telefone
        this.email = email
        this.provincia_id = provincia_id
        this.curso_id = curso_id
        this.foto_perfil = foto_perfil
        this.BI_img = BI_img
        this.certificado_img = certificado_img
        this.comprovativo_img = comprovativo_img
        this.matriculado = Boolean(false)
    }

    async adiciona() {
        await AlunoRepo.adiciona(this)
    }

    static async pergarPorCampo(campo, valor, options_default = { bloquearNaAusencia: true }) {
        const options = Object.assign({ bloquearNaAusencia: true }, options_default)
        if (!campo || !valor) return null
        const dados = await AlunoRepo.pegarPorCampo(campo, valor)
        if (!dados) {
            if (options.bloquearNaAusencia) throw new errors.UsuarioNaoEncontrado(campo, valor)
            return null
        }
        const aluno = new Aluno(dados)
        aluno.id = dados.id
        aluno.matriculado = await aluno.estaMatriculado()
        return aluno
    }

    static async pegarPorEmail(emailEnviado, options_default = { bloquearNaAusencia: true }) {
        const options = Object.assign({ bloquearNaAusencia: true }, options_default)
        if (!emailEnviado) return null
        const dados = await AlunoRepo.pegarPorEmail(emailEnviado)
        if (!dados) {
            if (options.bloquearNaAusencia) throw new errors.UsuarioNaoEncontrado('EMAIL', emailEnviado)
            return undefined
        }
        const aluno = new Aluno(dados)
        aluno.id = dados.id
        aluno.matriculado = await aluno.estaMatriculado()
        return aluno
    }

    async estaMatriculado() {
        try {
            const matriculas = await AlunoRepo.matriculas(this.id)
            return matriculas.length > 0
        } catch (error) {
            return false
        }
    }

    async atualizarComprovativo(comprovativo) {
        try {
            await AlunoRepo.atualizarComprovativo(comprovativo, this.email)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async alunoPreCadastrado(email) {
        const aluno = await AlunoRepo.alunoPreCadastrado(email)
        return aluno
    }
}