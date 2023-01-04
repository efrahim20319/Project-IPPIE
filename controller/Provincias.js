import Provicias from "../model/Provincias";

export class Provincias {

    static async lista(req, res, next) {
        try {
            const provincias = await Provicias.listarProvincias()
        res.json(provincias)
        } catch (error) {
            next(error)
        }
    }
}