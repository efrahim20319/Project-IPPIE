const redis = require("redis")
import manipulaLista from "./manipula-lista"
const allowlist = redis.createClient({prefix: "allowlist-refresh-token:"})
const manipulaAllowlist = manipulaLista(allowlist)
allowlist.connect()
    .then(console.log("Allowlist conectada com sucesso"))
    .catch((erro) => {
        console.error(erro);
    })
export default manipulaAllowlist