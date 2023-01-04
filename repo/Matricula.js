import moment from "moment"
const { QueryTypes } = require('sequelize')
const database = require("../database/models")
export default class MatriculaRepo {
    static async adiciona(dados) {
        await database.Matriculas.create(dados)
    }

    static async pegaMatriculadosUltimaSemana() {
        function formataData(dias_a_Reduzir) {
            return moment().subtract(dias_a_Reduzir, 'days').format('YYYY-MM-DD')
        }
        function criaQueryUnida(n_queries) {
            let query = ''
            for (let index = 0, dias_a_Reduzir = 6; index < n_queries; index++, dias_a_Reduzir--) {
                query = String(query) + ` Select count(*) as Total from Matriculas where createdAt like '${formataData(dias_a_Reduzir)}%'`
                if (index == n_queries - 1) continue
                query = String(query) + ' union all'
            }
            return query
        }
        const query = criaQueryUnida(7)
        return await database.sequelize.query(query, { type: QueryTypes.SELECT })
    }

    static async pegaReceitaUltimaSemana() {
        function formataData(dias_a_Reduzir) {
            return moment().subtract(dias_a_Reduzir, 'days').format('YYYY-MM-DD')
        }
        function criaQueryUnida(n_queries) {
            let query = ''
            for (let index = 0, dias_a_Reduzir = 6; index < n_queries; index++, dias_a_Reduzir--) {
                query = String(query) + ` select sum(Total) as Total from 
                (select Cursos.nome, sum(Cursos.preco) as Total
                from Alunos
                inner join Matriculas on Alunos.id = Matriculas.aluno_id
                inner join Cursos on Alunos.curso_id = Cursos.id
                where Matriculas.createdAt like '${formataData(dias_a_Reduzir)}%' and Matriculas.status = 'confirmado'
                group by Cursos.nome) as TotalMatriculasCurso`
                if (index == n_queries - 1) continue
                query = String(query) + ' union all'
            }
            return query
        }
        const query = criaQueryUnida(7)
        return await database.sequelize.query(query, { type: QueryTypes.SELECT })
    }

    static async alunosMatriculados() {
        const query = `SELECT Alunos.id as idAluno, Alunos.nome, Cursos.nome as curso, Matriculas.status 
        FROM Alunos
        INNER JOIN Cursos
        ON Alunos.curso_id = Cursos.id
        INNER JOIN Matriculas
        ON Alunos.id = Matriculas.aluno_id;`
        return await database.sequelize.query(query, { type: QueryTypes.SELECT })
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
        return await database.sequelize.query(query, { type: QueryTypes.SELECT })
    }
} 