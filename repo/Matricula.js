import moment from 'moment'
import { unificadorQueries } from '../infrastructure/utils/unificadorQueries'
const { QueryTypes } = require('sequelize')
const database = require('../database/models')
export default class MatriculaRepo {
    static async adiciona(dados) {
        await database.Matriculas.create(dados)
    }
    static async pegaMatriculadosUltimosDias(numero_de_dias) {
        const query = ` Select count(*) as Total from 
        Matriculas where createdAt like '+*+*%'`
        const queryFinal = unificadorQueries(numero_de_dias, query)
        return await database.sequelize.query(queryFinal, {
            type: QueryTypes.SELECT,
        })
    }

    static async pegaReceitaUltimosDias(numero_de_dias) {
        const query = ` select sum(Total) as Total from 
        (select Cursos.nome, sum(Cursos.preco) as Total
        from Alunos
        inner join Matriculas on Alunos.id = Matriculas.aluno_id
        inner join Cursos on Alunos.curso_id = Cursos.id
        where Matriculas.createdAt like '+*+*%' and Matriculas.status = 'confirmado'
        group by Cursos.nome) as TotalMatriculasCurso`
        const queryFinal = unificadorQueries(numero_de_dias, query)
        return await database.sequelize.query(queryFinal, {
            type: QueryTypes.SELECT,
        })
    }

    static async pegaReceitaTotal() {
        const query = `select sum(Total) as total from 
        (select Cursos.nome, sum(Cursos.preco) as Total
        from Alunos
        inner join Matriculas on Alunos.id = Matriculas.aluno_id
        inner join Cursos on Alunos.curso_id = Cursos.id
        where Matriculas.status = 'confirmado'
        group by Cursos.nome) as TotalMatriculasCurso;`
        return await database.sequelize.query(query, {
            type: QueryTypes.SELECT,
        })
    }

    static async alunosMatriculados() {
        const query = `SELECT Alunos.id as idAluno, Alunos.nome, Cursos.nome as curso, Matriculas.status 
        FROM Alunos
        INNER JOIN Cursos
        ON Alunos.curso_id = Cursos.id
        INNER JOIN Matriculas
        ON Alunos.id = Matriculas.aluno_id;`
        return await database.sequelize.query(query, {
            type: QueryTypes.SELECT,
        })
    }

    static async cursoPorMatricula() {
        const query = `select nome, sum(inscricoes) as inscricoes from (
            select  Cursos.nome, count(*) as inscricoes from Cursos
            inner join Alunos
            ON Cursos.id = Alunos.curso_id
            inner join Matriculas
            ON Alunos.id = Matriculas.aluno_id
            group by Cursos.nome
            union
            select Cursos.nome, 0 as inscricoes from Cursos) as MatriculasPorCurso 
            group by nome
            order by inscricoes desc;`
        return await database.sequelize.query(query, {
            type: QueryTypes.SELECT,
        })
    }

    static async calculaTotal() {
        const total = await database.Matriculas.count()
        return total
    }

    static async modificaStatusMatricula(id, status = 'confirmado') {
        try {
            await database.Matriculas.update(
                { status: status },
                {
                    where: {
                        id,
                    },
                }
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
