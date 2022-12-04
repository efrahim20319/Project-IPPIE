import bcrypt from "bcrypt"
import AdminRepo from "../repo/Admin"


export default class Admin {
    constructor(admin) {
        this.nome = admin.nome
        this.email = admin.email
        this.password = admin.password
    }

    async adiciona() {
        const dados = {
            ...this, 
            password: await Admin.geraSenhaHash(this.password)
        }
        await AdminRepo.adiciona(dados)
    }

    static async pegarPorEmail(email) {
        return await AdminRepo.pegarPorEmail(email)
    }

    static async pegarPorId(id) {
        return await AdminRepo.pegarPorId(id)
    }

    static async geraSenhaHash(senha) {
        const custoHash = 12
        return await bcrypt.hash(senha, custoHash)
    }
}