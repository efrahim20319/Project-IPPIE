import MatriculaRepo from "../repo/Matricula"

export default class Matricula {
    constructor({ status, aluno_id, pago}) {
        this.status = status
        this.aluno_id = aluno_id
        this.pago = pago
    }


    async adicionar() {
        await MatriculaRepo.adiciona(this)
    }

    static async alunosMatriculados() {
        return await MatriculaRepo.alunosMatriculados()
    }

    static async cursoPorMatricula() {
        return await MatriculaRepo.cursoPorMatricula()
    }

    static async modificaStatusMatricula(id, status) {
        await MatriculaRepo.modificaStatusMatricula(id)
    }
}