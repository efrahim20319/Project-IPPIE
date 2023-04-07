import manipulaSuperAdmin from "../../database/redis/super-admin-list"
import { criarTokenOpaco, invalidaTokenOpaco, verificaTokenOpaco } from "./manipula-refresh-token"


export default {
    nome: "Super Admin Token",
    expiracao: [15, 'm'],
    lista: manipulaSuperAdmin,
    async criar(id) {
        return await criarTokenOpaco(id, this.expiracao, this.lista)
    },
    async verifica(token) {
        return await verificaTokenOpaco(token, this.nome, this.lista)
    },
    async invalida(token) {
        await invalidaTokenOpaco(token, this.lista)
    }
}