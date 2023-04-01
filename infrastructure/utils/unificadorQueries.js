import moment from 'moment'
function formataData(dias_a_Reduzir) {
    return moment().subtract(dias_a_Reduzir, 'days').format('YYYY-MM-DD')
}
function criaQueryUnida(n_queries, query) {
    let queryFinal = ''
    let dataFormatada = ''
    for (
        let index = 0, dias_a_Reduzir = n_queries - 1;
        index < n_queries;
        index++, dias_a_Reduzir--
    ) {
        dataFormatada = `${formataData(dias_a_Reduzir)}`
        queryFinal =
            String(queryFinal) +
            String(query).replace(/\+\*\+\*/, String(dataFormatada))
        if (index == n_queries - 1) continue
        queryFinal = String(queryFinal) + ' union all '
    }
    return queryFinal
}

export function unificadorQueries(n_queries, query) {
    return criaQueryUnida(n_queries, query)
}
