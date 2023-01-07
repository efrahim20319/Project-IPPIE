const alunosElement = document.querySelector('#totalAlunos')
const receitasElement = document.querySelector('#totalReceita')
const matriculasElement = document.querySelector('#totalMatriculas')

fetch('http://localhost:3333/api/dados/total-ocorrencias')
    .then(res => {
        return res.json()
    })
    .then(({ totalAlunos, totalMatriculas, totalReceitas }) => {
        alunosElement.innerText = totalAlunos
        matriculasElement.innerText = totalMatriculas
        receitasElement.innerText = `${totalReceitas ? totalReceitas : 0} AOA`
    })