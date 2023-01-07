import UsuarioNaoEncontrado from "../errors/usuarioNaoEncontrado";
import Dados from "../model/Dados";
export default class DadosController {
    static async graficoGeral(req, res, next) {
        try {
            const dados = await Dados.graficoGeral()
            res.json(dados)
        } catch (error) {
            next(error)
        }
    }

    static async totalDeOcorrencias(req, res, next) {
        try {
            const dados = await Dados.totalDeOcorrencias()
            res.json(dados)
        } catch (error) {
            next(error)
        }
    }

    static async obterAlunoMatriculado(req, res, next) {
        try {
            const { id } = req.params
            console.log(id);
            const aluno = await Dados.obterAlunoMatriculado(Number(id))
            if (!aluno.length) throw new UsuarioNaoEncontrado({info: 'id', valor: id})
            res.json({ Aluno: aluno[0] })
        } catch (error) {
            next(error)
        }
    }
}