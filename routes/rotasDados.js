const { Router } = require("express");
const { default: DadosController } = require("../controller/Dados");

const roteadorDados = Router()
const dados = Router()


roteadorDados.use('/dados', dados)

dados.get('/grafico-geral', DadosController.graficoGeral)

export default roteadorDados