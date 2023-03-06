import AlunoRepo from "../repo/Aluno";
import MatriculaRepo from "../repo/Matricula";
function formataDadosRetorno(dados) {
    return dados.map(dado => dado.Total ? dado.Total : 0)
}

export default class Dados {
    static async graficoGeral() {
        let dadosAlunos = formataDadosRetorno(await AlunoRepo.pegaCadastradosUltimaSemana())
        let dadosMatriculas = formataDadosRetorno(await MatriculaRepo.pegaMatriculadosUltimaSemana())
        let dadosReceita = formataDadosRetorno(await MatriculaRepo.pegaReceitaUltimaSemana())
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