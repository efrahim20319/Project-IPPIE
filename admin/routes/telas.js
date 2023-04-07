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

telas.get('/user/id/:id', middlewares.autenticacao.estaLogado(), async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`http://localhost:3333/api/matriculas/aluno-matriculado/${id}`)
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
        const response = await fetch(`http://localhost:3333/api/mensagem/${id}`)
        const mensagem = await response.json()
        console.log(mensagem);
        if (mensagem)
            return res.render('msg-info', { mensagem })
        return res.send('Nao Encontrado')
    } catch (error) {
        return res.send('Nao Encontrado')
    }
})

telas.get("/cadastrar", (_req, res) => {
    res.status(200).render('cadastrar')
})

telas.get('/adminLogin', (req, res, next) => {
    res.render('super-adm-login')
})

export default telas