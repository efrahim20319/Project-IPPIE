import tokens from "../infrastructure/tokens"
import Admin from "../model/Admin"

const cookieOptions = {
    httpOnly: true,
    secure: false
}
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

    static async estaValido(_req, res, _next) {
        try {
            return res.status(200).end()
        } catch (error) {
            return res.status(400).json()
        }
    }

    static async login(req, res, next) {
        try {
            const usuario = req.user
            const accessToken = tokens.access.criar(usuario.id)
            const refreshToken = await tokens.refresh.criar(usuario.id)
            res.cookie("access_token", accessToken, cookieOptions)
            res.cookie("refresh_token", refreshToken, cookieOptions)
            res.set("Authorization", accessToken)
            return res.status(200).json({ refreshToken })
        } catch (error) {
            return next(error)
        }
    }

    static async logout(req, res, next) {
        try {
            const token = req.token
            await tokens.access.invalida(token)
            return res.status(200).end()
        } catch (error) {
            return next(error)
        }

    }
}