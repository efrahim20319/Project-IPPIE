import { Router } from "express"
import UsuarioNaoEncontrado from "../../errors/usuarioNaoEncontrado"
import Usuario from "../../model/Usuario"
import { rotasCursos } from "./rotasCursos"
import tokens from "../../infrastructure/tokens"
import Aluno from "../../model/Alunos"
import Matricula from "../../model/Matricula"
const roteador = Router()

roteador.get("/", (req, res) => {
  res.status(200).render("home")
})

roteador.get("/pagar", (req, res) => {
  res.status(200).render('pagarStripe', {
    paypalClientID: process.env.PAYPAL_CLIENT_ID
  })
})

roteador.get('/sucessPayment', async (req, res) => {
  const token = req.query.email
  const email = await tokens.manipulaPaymentToken.verifica(token)
  const aluno = await Aluno.pegarPorEmail(email, { BloquearNaAusencia: false })
  if (aluno) {
    const matricula = new Matricula({ status: "pendente", aluno_id: aluno.id, pago: true })
    await matricula.adicionar()
    return res.status(200).render("succesfull-payment")
  }
  return res.status(401).redirect('/')
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