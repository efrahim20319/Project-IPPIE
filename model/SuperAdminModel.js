import utils from "../infrastructure/utils"
import { SuperAdminRepo } from "../repo/SuperAdmin"
import bcrypt from "bcrypt"
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
        this.nome = dados.senha
        await SuperAdminRepo.adiciona(dados)
    }

    static async obterSuperAdmin() {
        return new SuperAdminModel(await SuperAdminRepo.obterSuperAdmin())
    }

    async validaSenha(senhaEnviada) {
        return await bcrypt.compare(senhaEnviada, this.senha)
    }
}