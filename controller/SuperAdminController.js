import { SuperAdminModel } from "../model/SuperAdminModel"

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
}   