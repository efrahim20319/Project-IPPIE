import SQLError from "../errors/SQLError";
import UsuarioJaCadastrado from "../errors/UsuarioJaCadastrado";

const database = require("../database/models")

export default class AlunoRepo {
    static async adiciona(dados) {
        try {
            await database.Alunos.create(dados)
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                for (const erro of error.errors) {
                    if (erro.message == 'email must be unique') 
                        throw new UsuarioJaCadastrado(erro.path, erro.value)
                    if (erro.message == 'numero_BI must be unique') 
                        throw new UsuarioJaCadastrado(erro.path, erro.value)
                }
            }
            throw new SQLError(error.message)
        }
    }

    static async pegarPorEmail(email) {
        return await database.Alunos.findOne({
            where: {
                email
            },
            raw: true
        })
    }

    static async pegarPorCampo(campo, valor) {
        return await database.Alunos.findOne({
            where: {
                [campo]: valor
            },
            raw: true
        })
    }

    static async estaMatriculado(aluno_id) {
        const matriculas = await database.Matriculas.findAll({
            include: {
                model: database.Alunos,
                required: true
            },
            where: {
                aluno_id
            }
        })
        return matriculas
    }
} 