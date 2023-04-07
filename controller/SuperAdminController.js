import { SuperAdminModel } from "../model/SuperAdminModel"
import tokens from '../infrastructure/tokens/'
export class SuperAdminController {

    static async adiciona(req, res, next) {
        try {
            const { nome, senha } = req.body
            const superAdmin = new SuperAdminModel({ nome, senha })
            await superAdmin.adicionar()
            res.status(201).send('Super Adminstrador criado com sucesso')
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { senha } = req.body
            const superAdmin = await SuperAdminModel.obterSuperAdmin()
            const senhaValida = await superAdmin.validaSenha(senha)
            if (senhaValida) {
                const token = await tokens.manipulaSuperAdminToken.criar(superAdmin.nome)
                return res.status(200).json({ token })
            }
            return res.status(401).send()
        } catch (error) {
            next(error)
        }
    }
}