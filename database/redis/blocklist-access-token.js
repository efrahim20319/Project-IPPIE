const redis = require("redis")
const blockList = redis.createClient({ prefix: "blocklist-refresh-token:" })
import jwt from "jsonwebtoken"
import { createHash } from "crypto"
import manipulaLista from "./manipula-lista"
const manipulaBlockList = manipulaLista(blockList)
blockList.connect()
    .then(() => console.log("BlockList Conectada com sucesso"))
    .catch((erro) => {
        console.error(erro);
    })

function geraTokenHash(token) {
    return createHash("sha256").update(token).digest("hex")
}

export default {
    async adiciona(token) {
        const dataExpiracao = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        await manipulaBlockList.adiciona(tokenHash, "", dataExpiracao)
    },
    async contemToken(token) {
        const tokenHash = geraTokenHash(token)
        return await manipulaBlockList.contemChave(tokenHash)
    }
}