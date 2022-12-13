const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import Cursos from "../model/Cursos"
export default class StripePayment {
    static async checkoutSession(req, res, next) {
        const cursosMap = await Cursos.listarCursosMap()
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: req.body.items.map(item => {
                    const cursoItem = cursosMap.get(item.id)
                    return {
                        price_data: {
                            currency: 'aoa',
                            product_data: {
                                name: cursoItem.nome
                            },
                            unit_amount: cursoItem.preco * 100 //preco em centimos
                        },
                        quantity: item.quantidade
                    }
                }),
                success_url: `${process.env.SERVER_URL}/sucessPayment`,
                cancel_url: `${process.env.SERVER_URL}/canceledPayment`
            })
            return res.json({url: session.url})
        } catch (error) {
            return next(error)
        }
    }
}