import AlunoRepo from "../repo/Aluno";
import MatriculaRepo from "../repo/Matricula";
function formataDadosRetorno(dados) {
    return dados.map(dado => dado.Total ? dado.Total : 0)
}

export default class Dados {
    static async graficoGeral() {
        const alcance = 90
        let dadosAlunos = formataDadosRetorno(await AlunoRepo.pegaCadastradosUltimosDias(alcance))
        let dadosMatriculas = formataDadosRetorno(await MatriculaRepo.pegaMatriculadosUltimosDias(alcance))
        let dadosReceita = formataDadosRetorno(await MatriculaRepo.pegaReceitaUltimosDias(alcance))
        return { dadosAlunos, dadosMatriculas, dadosReceita }
    }

    static async totalDeOcorrencias() {
        const totalAlunos = await AlunoRepo.calculaTotal()
        const totalMatriculas = await MatriculaRepo.calculaTotal()
        const totalReceitas = await MatriculaRepo.pegaReceitaTotal()
        return { totalAlunos, totalMatriculas, totalReceitas: totalReceitas[0].total }
    }

    static async obterAlunoMatriculado(id, raw=false) {
        const aluno = await AlunoRepo.obterMatriculasEhCurso(id, raw)
        return aluno
    }
}