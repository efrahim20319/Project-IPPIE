import { Router } from "express"
import PaypalPayment from "../services/PaypalPayment"
import StripePayment from "../services/StripePayment"



const rotasPagamento = Router()

rotasPagamento.post("/create-checkot-session", StripePayment.checkoutSession)
rotasPagamento.post('/create-paypal-order', PaypalPayment.createOrder)

export default rotasPagamento