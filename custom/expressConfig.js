import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/public", express.static("./public")) // arquivos estaticos na pasta public, acessados na rota /public
app.use(cors({origin: "*"}))
app.set("view engine", "ejs")
export default app