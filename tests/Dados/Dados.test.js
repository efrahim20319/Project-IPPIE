import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../app"
import { config } from "dotenv";
import db from "../../database/models";
import ConexaoListas, { fecharConexoesListas } from "../../database/redis/conexaoListas";
import Dados from "../../model/Dados";


config()
let server;
// jest.setTimeout(1000000000)

beforeEach(async () => {
    const port = process.env.TEST_PORT
    await ConexaoListas()
    await db.sequelize.authenticate()
    server = app.listen(port, () => console.log("Rodando na porta de Teste"))
})

afterEach(async () => {
    await fecharConexoesListas()
    server.close()
})

describe('Testes na Classe Dados', () => { //Nao esquecer de escrever este teste
    it('Deve retornar as informacoes para preencher no grafico', async () => {
        const dados = await Dados.graficoGeral()
        console.log(dados);
    });  

    it('Deve retornar o total de alunos, matriculas e receita', async () => {
        const dados = await Dados.dadosCards()
        console.log(dados);
    }); 
});
