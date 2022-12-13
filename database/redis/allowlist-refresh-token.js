const redis = require("redis")
import manipulaLista from "./manipula-lista"
const allowlist = redis.createClient({ prefix: "allowlist-refresh-token:" })
const manipulaAllowlist = manipulaLista(allowlist)
export default manipulaAllowlist


export { allowlist } 