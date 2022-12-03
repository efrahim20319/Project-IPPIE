import Admin from "../model/Admin"

export default class AdminController {
    static async adiciona(req, res, next) {
        try {
            const { nome, email, password } = req.body
            const admin = new Admin({ nome, email, password })
            await admin.adiciona()
            res.status(201).send("Criado com sucesso")
        } catch (error) {
            next(error)
        }
    }
}