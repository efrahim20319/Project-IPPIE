const { Router } = require("express");
const { Provincias } = require("../controller/Provincias");

const rotasProvincias = Router()
const provincias = Router()

rotasProvincias.use('/provincias', provincias)
provincias.get('/', Provincias.lista)

export default rotasProvincias