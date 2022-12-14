
import Cursos from "../model/Cursos"
const paypal = require("@paypal/checkout-server-sdk")


const Environment = process.env.NODE_ENV ===  'production' 
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment

const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET))


export default class PaypalPayment {
    static async createOrder(req, res, next) {
        const cursosMap = await Cursos.listarCursosMap({precoEmEuro: true})
        try {
            const request = new paypal.orders.OrdersCreateRequest()
            const total = req.body.items.reduce((sum, item) => {
                return sum + cursosMap.get(item.id).preco * item.quantidade 
            }, 0)
            request.prefer("return=representation")
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "EUR",
                            value: total,
                            breakdown: {
                                item_total: {
                                    currency_code: "EUR",
                                    value: total
                                }
                            }
                        },
                        items: req.body.items.map(item => {
                            const cursoItem = cursosMap.get(item.id)
                            return {
                                name: cursoItem.nome,
                                unit_amount: {
                                    currency_code: "EUR",
                                    value: cursoItem.preco
                                },
                                quantity: item.quantidade
                            }
                        })
                    }
                ]
            }) 
            const order = await paypalClient.execute(request)
            res.status(200).json({id: order.result.id})
        } catch (error) {
            return next(error)
        }
    }
}