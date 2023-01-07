import moment from "moment";
import db from "../database/models";
const { QueryTypes } = require('sequelize')
import SQLError from "../errors/SQLError";
import UsuarioJaCadastrado from "../errors/UsuarioJaCadastrado";
const database = require("../database/models")

export default class AlunoRepo {
    static async adiciona(dados) {
        try {
            await database.Alunos.create(dados)
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') { //Deve ser melhorado
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

    static async pegaCadastradosUltimaSemana() {
        function formataData(dias_a_Reduzir) {
            return moment().subtract(dias_a_Reduzir, 'days').format('YYYY-MM-DD')
        }
        function criaQueryUnida(n_queries) {
            let query = ''
            for (let index = 0, dias_a_Reduzir = 6; index < n_queries; index++, dias_a_Reduzir--) {
                query = String(query) + ` Select count(*) as Total from Alunos
                where createdAt like '${formataData(dias_a_Reduzir)}%'`
                if (index == n_queries - 1) continue
                query = String(query) + ' union all'
            }
            return query
        }
        const query = criaQueryUnida(7)
        return await db.sequelize.query(query, { type: QueryTypes.SELECT })
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

    static async matriculas(aluno_id, raw = false) {
        const matriculas = await database.Matriculas.findAll({
            include: {
                model: database.Alunos,
                required: true
            },
            where: {
                aluno_id
            },
            raw
        })
        return matriculas
    }

    static async obterMatriculasEhCurso(aluno_id, raw = false) { //Ha uma confusao aqui
        const matriculas = await database.Alunos.findAll({
            include: [{
                model: database.Matriculas,
                required: true
            }, {
                model: database.Cursos,
                required: true
            }, {
                model: database.Provincias,
                required: true
            }],
            where: {
                id: aluno_id
            },
            raw
        })
        return matriculas
    }

    static async calculaTotal() {
        const total = await database.Alunos.count()
        return total
    }
} 