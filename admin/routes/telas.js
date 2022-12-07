import { Router } from "express";
import middlewares from "../middlewares/index.js";


const telas = Router()

telas.get("/", middlewares.autenticacao.estaLogado(), async (_req, res, _next) => {
    res.render("dashboard")
})
telas.get("/entrar", middlewares.autenticacao.estaLogado(), (req, res) => {
    const estaLogado = res.getHeader("IsLogged")
    if (estaLogado)
        return res.redirect('/')
    return res.status(401).render('entrar')
})
telas.get("/cadastrar", (_req, res) => {
    res.status(200).render('cadastrar')
})

export default telas