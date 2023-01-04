function dateCategories() {
    let categories = new Array(6)
    for (let index = 6, c = 0; index >= 0; index--, c++) {
        categories[index] = `${moment().subtract(c, 'days').format('YYYY-MM-DD')}T00:00:00.000Z`
    }
    return categories
}

async function dadosGraficoGeral() {
    const response = await fetch('http://localhost:3333/api/dados/grafico-geral')
    return await response.json()
}

dadosGraficoGeral().then(({ dadosAlunos,dadosReceita,dadosMatriculas }) => {
        new ApexCharts(document.querySelector("#reportsChart"), {
            series: [{
                name: 'Alunos',
                data: dadosAlunos
            }, {
                name: 'Receita',
                data: dadosReceita.map(item => item/1000) //Teve que se fazer esta divisao para que o grafico nao fique gigantesco
            }, {
                name: 'Matriculas',
                data: dadosMatriculas
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: true
                },
            },
            markers: {
                size: 4
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                type: 'datetime',
                categories: dateCategories()
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            }
        }).render();
})