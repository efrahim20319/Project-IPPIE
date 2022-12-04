import tokens from "../infrastructure/tokens"
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

    static async login(req, res, next) {
        try {
            const usuario = req.user
            const accessToken = tokens.access.criar(usuario.id)
            const refreshToken = await tokens.refresh.criar(usuario.id)
            res.set("Authorization", accessToken)
            return res.status(200).json({ refreshToken })
        } catch (error) {
            next(error)
        }
    }
}