import Provicias from "../model/Provincias";

export class Provincias {

    static async lista(req, res, next) {
        const provincias = await Provicias.listarProvincias()
        res.json(provincias)
    }
}