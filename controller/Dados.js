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
}