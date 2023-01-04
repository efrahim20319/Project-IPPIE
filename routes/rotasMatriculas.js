import MatriculasController from "../controller/Matriculas";

const { Router } = require("express");


const roteadorMatriculas = Router()
const matriculas = Router()


roteadorMatriculas.use('/matriculas', matriculas)

matriculas.get('/lista-alunos', MatriculasController.listarAlunoMatriculados)
matriculas.get('/lista-cursosMatricula', MatriculasController.listarCursosPorMatricula)

export default roteadorMatriculas