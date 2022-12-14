import { Router } from "express"
import UsuarioNaoEncontrado from "../../errors/usuarioNaoEncontrado"
import Usuario from "../../model/Usuario"
import { rotasCursos } from "./rotasCursos"
const roteador = Router()

roteador.get("/", (req, res) => {
  res.status(200).render("home")
})

roteador.get("/pagar", (req, res) => {
  res.status(200).render('pagarStripe', {
    paypalClientID: process.env.PAYPAL_CLIENT_ID
  })
})

roteador.get('/sucessPayment', (req, res) => {
  res.status(200).render("succesfull-payment")
})

roteador.get('/canceledPayment', (req, res) => {
  res.status(200).render("cancel-payment")
})

roteador.get("/sucess-signin", async (req, res) => {
  const email = req.query.email
  try {
    const usuario = await Usuario.pegarPorEmail(email)
    if (!usuario.emailVerificado) 
      return res.status(200).render("cadastro-usuario-sucesso", { email })
    else return res.status(400).render('home')
  } catch (erro) {
    if (erro instanceof UsuarioNaoEncontrado) {
     return res.status(404).render('home')
    }
  }
})

roteador.use("/cursos", rotasCursos)

roteador.get('/matricula', (req, res) => {
  res.status(200).render('matricula')
})

roteador.use((_req, res) => {
  // rota para página não encontrada, ou seja, tem que ser o último middleware a ser passado na requisição
  res.status(404).render("tela-404");
});
export default roteador