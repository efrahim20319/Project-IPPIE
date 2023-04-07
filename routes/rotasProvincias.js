const { Router } = require("express");
const { Provincias } = require("../controller/Provincias");

const rotasProvincias = Router()
rotasProvincias.route('/provincias')
    .get(Provincias.lista)

export default rotasProvincias