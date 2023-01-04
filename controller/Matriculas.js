import MatriculaRepo from '../repo/Matricula'

export default class MatriculasController {


    static async listarAlunoMatriculados(req, res, next) {
        try {
            const matriculas = await MatriculaRepo.alunosMatriculados()
            res.json(matriculas)
        } catch (error) {
            next(error)
        }
    }

    static async listarCursosPorMatricula(req, res, next) {
        try {
            const cursos = await MatriculaRepo.cursoPorMatricula()
            res.json({cursos})
        } catch (error) {
            next(error)
        }
    }
}
