import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/public", express.static("./public")) // arquivos estaticos na pasta public, acessados na rota /public
app.set("view engine", "ejs")
// app.use(cors({origin: "http://localhost:5000", credentials: true}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
})
export default app