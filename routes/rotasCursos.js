const { Router } = require("express");
const { Cursos } = require("../controller/Cursos");

const rotasCursos = Router()
const cursos = Router()

rotasCursos.use('/cursos', cursos)
cursos.get('/', Cursos.lista)

export default rotasCursos