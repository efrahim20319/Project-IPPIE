import ProvinciasRepo from "../repo/Provicias"

export default class Provicias {
    static async listarProvincias() {
        return await ProvinciasRepo.listarProvincias()
    }
}