import { Router } from "express"
import PaypalPayment from "../services/PaypalPayment"
import StripePayment from "../services/StripePayment"
import Aluno from "../model/Alunos"
import tokens from "../infrastructure/tokens"



const rotasPagamento = Router()

rotasPagamento.post("/create-checkot-session", StripePayment.checkoutSession)
rotasPagamento.post('/create-paypal-order', PaypalPayment.createOrder)

rotasPagamento.get('/geraToken/:email', async (req, res) => {
    const { email } = req.params
    const aluno = await Aluno.pegarPorEmail(email, { bloquearNaAusencia: false })
    const matriculado = await aluno.estaMatriculado()
    if (aluno && !matriculado) { //Deve tambem vericar se aluno ja foi matriculado, para bloquerar esta rota
        const token = tokens.verificacaoEmail.cria(email)
        return res.status(200).json({ token })
    }
    return res.status(401).send(null)
})

export default rotasPagamento