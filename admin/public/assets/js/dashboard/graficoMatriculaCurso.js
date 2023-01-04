async function dadosGraficoCursos() {
    const response = await fetch('http://localhost:3333/api/matriculas/lista-cursosMatricula')
    return await response.json()
}

dadosGraficoCursos().then(({cursos}) => {
    const labels = cursos.map(curso => curso.nome)
    const series = cursos.map(curso => Number(curso.inscricoes))
    new ApexCharts(document.querySelector("#grMatriculaCurso"), {
        series: series,
        labels: labels,
        chart: {
            height: 650,
            type: 'donut',
            toolbar: {
                show: true
            },
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d', '#aa54f1', '#bbca6a', '#cc771d', '#0039e6'],
    }).render();
})