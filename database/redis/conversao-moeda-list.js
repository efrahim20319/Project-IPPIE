const redis = require("redis")
import manipulaLista from "./manipula-lista"
const converterList = redis.createClient({ prefix: "converterlist:" })

const manipulaConverterList = manipulaLista(converterList)
export { converterList }
export default manipulaConverterList