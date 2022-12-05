const { Router } = require("express");
import AdminController from "../controller/Admin"
import middlewares from "../middlewares"

const admin = Router()
const adminRoutes = Router()
const logoutMidwares = [middlewares.MiddlewaresAutenticacao.refresh,
middlewares.MiddlewaresAutenticacao.bearer,
AdminController.logout]


adminRoutes.use("/admin", admin)

admin.post("/", AdminController.adiciona)
admin.post("/tokensValidos", middlewares.MiddlewaresAutenticacao.bearer, AdminController.estaValido)
admin.post('/login', middlewares.MiddlewaresAutenticacao.local, AdminController.login)
admin.post("/logout", logoutMidwares)

export default adminRoutes