import { Router } from "express";
import { SuperAdminController } from "../controller/SuperAdminController";

const rotasSuperAdmin = Router()

rotasSuperAdmin.route('/sp-admin')
    .post(SuperAdminController.adiciona)

export default rotasSuperAdmin