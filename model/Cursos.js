import CursosRepo  from "../repo/Cursos.js"

export default class Cursos {
    static async listarCursos() {
        return await CursosRepo.listarCursos()
    }

    static async listarCursosMap() {
        const cursos = await this.listarCursos()
        let mapCursos = new Map()
        let id, valor
        for (const curso of cursos) {
            id = curso.id
            valor = curso
            delete valor.id
            mapCursos.set(id, valor)
        }
        return mapCursos
    }
}