const redis = require('redis')
import manipulaLista from './manipula-lista'
const superAdminList = redis.createClient()
const manipulaSuperAdmin = manipulaLista(superAdminList)

export { superAdminList }

export default manipulaSuperAdmin
