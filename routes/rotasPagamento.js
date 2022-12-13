import { Router } from "express"
import StripePayment from "../services/StripePayment"


const rotasPagamento = Router()

rotasPagamento.post("/create-checkot-session", StripePayment.checkoutSession)

export default rotasPagamento