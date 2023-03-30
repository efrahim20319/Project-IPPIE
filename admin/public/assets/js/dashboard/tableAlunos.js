//table_students
async function alunosMatriculados() {
    const response = await fetch('http://localhost:3333/api/matriculas/lista-alunos')
    return await response.json()
}

function criaLinhaAluno(aluno) {
    let badgeClass = ''
    if (aluno.status === 'confirmado')
        badgeClass = 'badge bg-success'
    else if (aluno.status === 'pendente')
        badgeClass = 'badge bg-warning'
    else badgeClass = 'badge bg-danger'
    const linha = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdNome = document.createElement('td')
    const tdCurso = document.createElement('td')
    const tdStatus = document.createElement('td')
    tdId.innerHTML = `<a href='/user/id/${aluno.idAluno}'>${aluno.idAluno}</a>`
    tdNome.innerText = aluno.nome
    tdCurso.innerText = aluno.curso
    tdStatus.innerHTML = `<span class="${badgeClass}">${aluno.status}</span>`
    linha.append(tdId, tdNome, tdCurso, tdStatus)
    return linha
}
const tBodyMatriculas = document.querySelector("#tabela-matriculas")
export async function renderListaAluno() {
    const alunos = await alunosMatriculados()
    for (const aluno of alunos) {
        tBodyMatriculas.append(criaLinhaAluno(aluno))
    }
}
