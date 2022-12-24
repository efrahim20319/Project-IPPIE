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
}