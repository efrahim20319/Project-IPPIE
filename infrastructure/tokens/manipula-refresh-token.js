import crypto from "crypto"
import moment from "moment";
import { verificaTokenEnviado, verificaValidadeToken } from "./manipula-access-token"
import manipulaAllowlist from "../../database/redis/allowlist-refresh-token";

export default {
    nome: "Refresh Token",
    expiracao: [1, 'd'],
    lista: manipulaAllowlist,
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

async function criarTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowlist) {
    const tokenOpaco = crypto.randomBytes(24).toString("hex")
    const dataAtual = moment()
    const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade)
    const tempoExpiracao = dataExpiracao.diff(dataAtual, 'seconds')
    await allowlist.adiciona(tokenOpaco, id, tempoExpiracao)
    return tokenOpaco
}

async function verificaTokenOpaco(token, nome, allowlist) {
    verificaTokenEnviado(token, nome)
    const id = await allowlist.buscaValor(token)
    verificaValidadeToken(id, nome)
    return id
}

async function invalidaTokenOpaco(token, allowlist) {
    await allowlist.deleta(token)
}
