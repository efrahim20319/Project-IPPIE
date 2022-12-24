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
    }

    async adiciona() {
        await AlunoRepo.adiciona(this)
    }

    static async pegarPorEmail(emailEnviado, options_default = { BloquearNaAusencia: true }) {
        const options = Object.assign({ BloquearNaAusencia: true }, options_default)
        const dados = await AlunoRepo.pegarPorEmail(emailEnviado)
        if (!dados) {
            if (options.BloquearNaAusencia) throw new errors.UsuarioNaoEncontrado({ emailEnviado })
            return undefined
        }
        const aluno = new Aluno(dados)
        aluno.id = dados.id
        return aluno
    }
}