import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../app"
import { config } from "dotenv";
import db from "../../database/models";
import ConexaoListas, { fecharConexoesListas } from "../../database/redis/conexaoListas";
import MatriculaRepo from "../../repo/Matricula";


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

describe('Testes no Repositorio Matriculas', () => { //Nao esquecer de escrever este teste

    it('Deve retornar as matriculas feitas na ultima semana', async () => {
        const valores = await MatriculaRepo.pegaMatriculadosUltimaSemana()
        console.log(valores);
    });

    it('Deve retornar as matriculas associadas a alunos', async () => {
        const matriculas = await MatriculaRepo.alunosMatriculados()
        console.log(matriculas);
    });

    it('Deve retornar a receita da ultima semana', async () => {
        const valores = await MatriculaRepo.pegaReceitaUltimaSemana()
        console.log(valores);
    });

    it('Deve retornar o numero de matriculas cadastradas', async () => {
        const total = await MatriculaRepo.calculaTotal()
        console.log(total);
    });

    it('Deve retornar o total das recitas', async () => {
        const total = await MatriculaRepo.pegaReceitaTotal()
        console.log(total);
    });
    
});
