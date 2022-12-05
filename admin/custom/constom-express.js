import cookieParser from "cookie-parser"
import express from "express"
const app = express()
app.use(cookieParser())
app.use(express.static("./public"))
app.set("view engine", "ejs")

export default app