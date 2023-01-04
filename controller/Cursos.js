import Cursos from "../model/Cursos";

export class Cursos {
    static async lista(req, res, next) {
        try {
            const cursos = await Cursos.listarCursos()
        res.json(cursos)
        } catch (error) {
            next(error)
        }
    }
}