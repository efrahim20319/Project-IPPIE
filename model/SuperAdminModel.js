import utils from "../infrastructure/utils"
import { SuperAdminRepo } from "../repo/SuperAdmin"
export class SuperAdminModel {
    constructor({ nome, senha }) {
        this.nome = nome
        this.senha = senha
    }

    async adicionar() {
        const dados = {
            nome: this.nome,
            senha: await utils.geradorSenhaHash(this.senha)
        }
        await SuperAdminRepo.adiciona(dados)
    }
}