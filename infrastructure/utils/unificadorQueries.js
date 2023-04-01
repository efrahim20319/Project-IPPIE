// function formataData(dias_a_Reduzir) {
//     return moment().subtract(dias_a_Reduzir, 'days').format('YYYY-MM-DD')
// }
// function criaQueryUnida(query, n_queries) {
//     let query = ''
//     for (
//         let index = 0, dias_a_Reduzir = 6;
//         index < n_queries;
//         index++, dias_a_Reduzir--
//     ) {
//         query += ` select sum(Total) as Total from 
//         (select Cursos.nome, sum(Cursos.preco) as Total
//         from Alunos
//         inner join Matriculas on Alunos.id = Matriculas.aluno_id
//         inner join Cursos on Alunos.curso_id = Cursos.id
//         where Matriculas.createdAt like '${formataData(
//             dias_a_Reduzir
//         )}%' and Matriculas.status = 'confirmado'
//         group by Cursos.nome) as TotalMatriculasCurso;`
//         if ((index = n_queries - 1)) continue
//         query = +' union all'
//     }
//     return query
// }
function formataData(dias_a_Reduzir) {
    return moment().subtract(dias_a_Reduzir, 'days').format('YYYY-MM-DD')
}
function criaQueryUnida(n_queries, query) {
    let queryFinal = ''
    for (
        let index = 0, dias_a_Reduzir = n_queries-1;
        index < n_queries;
        index++, dias_a_Reduzir--
    ) {
        queryFinal =
            String(queryFinal) +
            String(query).replace(/(\+\*\+\*)/, `${formataData(dias_a_Reduzir)}`)
        if (index == n_queries - 1) continue
        queryFinal = String(queryFinal) + ' union all'
    }
    return query
}

export async function unificadorQueries(n_queries, query) {
    return query = criaQueryUnida(n_queries, query)
}
