// const port = 3333

function dateCategories(dias_a_Reduzir) {
    let categories = []
    for (let index = dias_a_Reduzir - 1, c = 0; index >= 0; index--, c++) {
        categories.unshift(
            `${moment().subtract(c, 'days').format('YYYY-MM-DD')}T00:00:00.000Z`
        )
    }
    return categories
}

async function dadosGraficoGeral() {
    const response = await fetch(
        `http://localhost:${3333}/api/dados/grafico-geral`
    )
    return await response.json()
}

dadosGraficoGeral().then(({ dadosAlunos, dadosReceita, dadosMatriculas }) => {
    const grafico = new ApexCharts(document.querySelector('#reportsChart'), {
        series: [
            {
                name: 'Alunos',
                data: dadosAlunos,
            },
            {
                name: 'Receita',
                data: dadosReceita.map((item) => item / 1000), //Teve que se fazer esta divisao para que o grafico nao fique gigantesco
            },
            {
                name: 'Matriculas',
                data: dadosMatriculas,
            },
        ],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: true,
            },
        },
        markers: {
            size: 4,
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            type: 'datetime',
            categories: dateCategories(90),
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
    })
    const hoje = new Date(`${moment().subtract(0, 'days').format('YYYY-MM-DD')}T00:00:00.000Z`)
    const umaSemaAtras = new Date(`${moment().subtract(7, 'days').format('YYYY-MM-DD')}T00:00:00.000Z`)
    grafico.render()
    grafico.zoomX(umaSemaAtras.getTime(), hoje.getTime())
})
