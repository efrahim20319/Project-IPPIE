import AdminRepo from "../repo/Admin"
import EmailJaCadastrado from "../errors/EmailJaCadastrado"
import utils from "../infrastructure/utils"

export default class Admin {
    constructor(admin) {
        this.nome = admin.nome
        this.email = admin.email
        this.password = admin.password
    }

    async adiciona() {
        const adminExistente = await Admin.pegarPorEmail(this.email)
        if (adminExistente) throw new EmailJaCadastrado(this.email)
        const dados = {
            ...this,
            password: await utils.geradorSenhaHash(this.password) //await Admin.geraSenhaHash(this.password)
        }
        await AdminRepo.adiciona(dados)
    }

    static async pegarPorEmail(email) {
        return await AdminRepo.pegarPorEmail(email)
    }

    static async pegarPorId(id) {
        return await AdminRepo.pegarPorId(id)
    }

}