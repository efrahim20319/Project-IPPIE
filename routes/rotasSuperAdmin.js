import { Router } from "express";
import { SuperAdminController } from "../controller/SuperAdminController";


const rotasSuperAdmin = Router()
const roteador = Router()


roteador.post('/', SuperAdminController.adiciona)
roteador.post('/login', SuperAdminController.login)

rotasSuperAdmin.use('/sp-admin', roteador)

export default rotasSuperAdmin