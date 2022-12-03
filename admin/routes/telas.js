import { Router } from "express";

const telas = Router()

telas.get("/", (_req, res) => {
    res.status(200).render('dashboard')
})
telas.get("/entrar", (_req, res) => {
    res.status(200).render('entrar')
})
telas.get("/cadastrar", (_req, res) => {
    res.status(200).render('cadastrar')
})

export default telas