import jwt from "jsonwebtoken";
import blocklistAcessToken from "../../database/redis/blocklist-access-token";

export default {
    nome: "Acess Token",
    expiracao: [10, 's'],
    lista: blocklistAcessToken,
    criar(id) {
        return criaTokenJWT(id, this.expiracao)
    },
    async verifica(token) {
        return await verificaTokenJWT(token, this.nome, this.lista)
    },
    async invalida(token) {
        await invalidaTokenJWT(token, this.lista)
    }
}

export function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
    const payload = { id };
    const token = jwt.sign(payload, process.env.CHAVE_JWT, {
        expiresIn: tempoQuantidade + tempoUnidade,
    });
    return token;
}

export async function verificaTokenJWT(token, nome, blockList) {
    try {
        await verificaTokenNaBlocklist(token, nome, blockList)
        verificaTokenEnviado(token, nome);
        const { id } = jwt.verify(token, process.env.CHAVE_JWT);
        verificaValidadeToken(id, nome);
        return id;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function verificaValidadeToken(id, nome) {
    if (!id) throw new Error(`${nome} Token Invalido`);
}

export function verificaTokenEnviado(token, nome) {
    if (!token) throw new Error(`${nome} não enviado!`);
}

async function verificaTokenNaBlocklist(token, nome, blocklist) {
    if (!blocklist) return
    const tokenNaBlocklist = await blocklist.contemToken(token)
    if (tokenNaBlocklist) {
        throw new jwt.JsonWebTokenError(`${nome} inválido por logout`)
    }
}

async function invalidaTokenJWT(token, blockList) {
    await blockList.adiciona(token)
}