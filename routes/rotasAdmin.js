const { Router } = require("express");
import AdminController from "../controller/Admin"


const admin = Router()
const adminRoutes = Router()

adminRoutes.use("/admin", admin)

admin.post("/", AdminController.adiciona)

export default adminRoutes