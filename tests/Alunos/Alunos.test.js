import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../app"
import { config } from "dotenv";
import db from "../../database/models";
import ConexaoListas, { fecharConexoesListas } from "../../database/redis/conexaoListas";
import Aluno from "../../model/Alunos";

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

describe('Testes no model Alunos', () => { //Nao esquecer de escrever este teste
    it('Deve retorar as matriculas de um aluno', async () => {
        const aluno = await Aluno.pegarPorEmail('cristiano@gmail.com', {bloquearNaAusencia: false})
        if (aluno) {
            const matriculado = await aluno.estaMatriculado()
        }
        // console.log("Matriculado ", matriculado);
    }); 

    it('Deve retorar um aluno pelo seu email', async () => {
        const aluno = await Aluno.pegarPorEmail('efrahimtks@gmail.com', {bloquearNaAusencia: false})
        // console.log("Aluno ", aluno);
    });

    it('Deve retorar um aluno pelo campo especificado', async () => {
        const aluno = await Aluno.pergarPorCampo('numero_BI', '95159369', {bloquearNaAusencia: false})
        console.log("Aluno tks: ", aluno);
    });
});
