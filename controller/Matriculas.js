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
            res.json({ cursos })
        } catch (error) {
            next(error)
        }
    }

    static async confirmarMatricula(req, res, next) {
        try {
            const { id } = req.params
            await MatriculaRepo.modificaStatusMatricula(Number(id), 'confirmado')
            res.status(200).send('Matricula confirmada com sucesso')
        } catch (error) {
            next(error)
        }
    }

    static async rejeitarMatricula(req, res, next) {
        try {
            const { id } = req.params
            await MatriculaRepo.modificaStatusMatricula(Number(id), 'cancelado')
            res.status(200).send('Matricula rejeitada com sucesso')
        } catch (error) {
            next(error)
        }
    }
}
