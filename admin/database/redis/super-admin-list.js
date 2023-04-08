import redis from 'redis'
import manipulaLista from './manipula-lista.js'
const superAdminList = redis.createClient()
const manipulaSuperAdmin = manipulaLista(superAdminList)

export { superAdminList }

export default manipulaSuperAdmin
