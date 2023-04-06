import utils from "../infrastructure/utils"
import CursosRepo from "../repo/Cursos.js"

export default class Cursos {
    static async listarCursos() {
        return await CursosRepo.listarCursos()
    }

    static async listarCursosMap(options = { precoEmEuro: false }) {
        const cursos = await this.listarCursos()
        let mapCursos = new Map()
        let id, valor
        let precosCalculados = new Map() // para memoizacao
        let precoConvertido = 0
        for (const curso of cursos) {
            id = curso.id
            if (options.precoEmEuro) {
                if ((precosCalculados.has(curso.preco)))
                    curso.preco = precosCalculados.get(curso.preco)
                else {
                    precoConvertido = await utils.precoEmEuro(curso.preco)
                    precosCalculados.set(curso.preco, precoConvertido)
                    curso.preco = precoConvertido
                }
            }
            valor = curso
            delete valor.id
            mapCursos.set(id, valor)
        }
        return mapCursos
    }
}