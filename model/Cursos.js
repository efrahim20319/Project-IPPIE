import CursosRepo  from "../repo/Cursos.js"

export default class Cursos {
    static async listarCursos() {
        return await CursosRepo.listarCursos()
    }
}