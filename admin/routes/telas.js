import { Router } from "express";
import { config } from 'dotenv'
config()
import middlewares from "../middlewares/index.js";
import manipulaSuperAdmin from "../database/redis/super-admin-list.js";
import { jwtTokenIsValid } from "../middlewares/Autenticacao.js";
const port = process.env.APP_PORT

const telas = Router()

telas.get("/", middlewares.autenticacao.estaLogado(), async (_req, res, _next) => {
    res.render("dashboard")
})
telas.get("/entrar", async (req, res) => {
    const { access_token } = req.cookies
    const estaLogado = await jwtTokenIsValid(access_token)
    if (estaLogado)
        return res.redirect('/')
    return res.status(401).render('entrar')
})

telas.get('/user/id/:id', middlewares.autenticacao.estaLogado(), async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`http://localhost:${port}/api/matriculas/aluno-matriculado/${id}`)
        const { Aluno } = await response.json()
        Object.defineProperty(Aluno, 'Matricula', {
            value: Aluno.Matriculas[0],
            enumerable: true,
            writable: true
        })
        delete Aluno.Matriculas
        if (Aluno)
            return res.render('user-info', { Aluno })
        return res.status(404).send('Nao Encontrado')
    } catch (error) {
        return res.status(404).send('Nao Encontrado')
    }
})

telas.get('/mensagem/id/:id', middlewares.autenticacao.estaLogado(), async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`http://localhost:${port}/api/mensagem/${id}`)
        const mensagem = await response.json()
        console.log(mensagem);
        if (mensagem)
            return res.render('msg-info', { mensagem })
        return res.send('Nao Encontrado')
    } catch (error) {
        return res.send('Nao Encontrado')
    }
})

telas.get("/cadastrar", async (req, res) => {
    try {
        const { token } = req.query
        const tokenEhvalido = await manipulaSuperAdmin.contemChave(token)
        if (tokenEhvalido)
            return res.status(200).render('cadastrar')
        else 
            return res.status(401).render('entrar')
    } catch (error) {
        return res.status(401).render('entrar')
    }
})

telas.get('/adminLogin', (req, res, next) => {
    res.render('super-adm-login')
})

export default telas