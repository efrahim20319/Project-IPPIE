import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../app"
import { config } from "dotenv";
import db from "../../database/models";
import ConexaoListas, { fecharConexoesListas } from "../../database/redis/conexaoListas";
import AlunoRepo from "../../repo/Aluno";

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
    it('Deve retorar os alunos da base de dados', async () => {
        const aluno = await AlunoRepo.pegarPorCampo('numero_BI', '95159369')
        expect(aluno).toEqual(expect.objectContaining({
            id: expect.any(Number),
            nome: expect.any(String),
            numero_BI: expect.any(String),
            endereco: expect.any(String),
            data_nascimento: expect.any(Date),
            nome_pai: expect.any(String),
            nome_mae: expect.any(String),
            numero_telefone: expect.any(String),
            email: expect.any(String),
            provincia_id: expect.any(Number),
            curso_id: expect.any(Number),
            foto_perfil: expect.any(String),
            BI_img: expect.any(String),
            certificado_img: expect.any(String),
            comprovativo_img: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          }))
    }); 

    it('Deve retornar os alunos cadastrados nos ultimos X dias', async () => {
        const valores = await AlunoRepo.pegaCadastradosUltimosDias(7)
        console.log(valores);
    });
    

    it('Deve retornar o numero de alunos cadastrados', async () => {
        const total = await AlunoRepo.calculaTotal()
        console.log(total);
    });

    it('Deve retornar os dados dos alunos matriculados pelo id', async () => {
        const matriculas = await AlunoRepo.matriculas(17, true)
        console.log(matriculas);
    });

    it('Deve retornar os dados dos alunos curso  matriculados pelo id', async () => {
        const matriculas = await AlunoRepo.obterMatriculasEhCurso(4)
        console.log(matriculas);
    }); //alunosAssociadosCursosProvincias

    it('Deve retornar os dados dos alunos Associados com Cursos e Provincias', async () => {
        const aluno = await AlunoRepo.alunoPreCadastrado('efrahimtks@gmail.com')
        console.log(aluno);
    });
});
