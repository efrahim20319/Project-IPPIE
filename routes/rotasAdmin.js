const { Router } = require("express");
import AdminController from "../controller/Admin"
import middlewares from "../middlewares"

const admin = Router()
const adminRoutes = Router()

adminRoutes.use("/admin", admin)

admin.post("/", AdminController.adiciona)
admin.post('/login', middlewares.MiddlewaresAutenticacao.local, AdminController.login)

export default adminRoutes