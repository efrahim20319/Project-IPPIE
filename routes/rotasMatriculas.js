import DadosController from "../controller/Dados";
import MatriculasController from "../controller/Matriculas";

const { Router } = require("express");


const roteadorMatriculas = Router()
const matriculas = Router()


roteadorMatriculas.use('/matriculas', matriculas)

matriculas.get('/lista-alunos', MatriculasController.listarAlunoMatriculados)
matriculas.get('/lista-cursosMatricula', MatriculasController.listarCursosPorMatricula)

matriculas.get('/aluno-matriculado/:id', DadosController.obterAlunoMatriculado) //Devia Ser Matricula controller depois eu resolvo
matriculas.post('/confirmar/:id', MatriculasController.confirmarMatricula)
matriculas.post('/rejeitar/:id', MatriculasController.rejeitarMatricula)

export default roteadorMatriculas