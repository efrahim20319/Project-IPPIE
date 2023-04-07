const { Router } = require("express");
const { Cursos } = require("../controller/Cursos");

const rotasCursos = Router()

rotasCursos.route('/cursos')
    .get(Cursos.lista)

export default rotasCursos