import Cursos from "../../model/Cursos";
import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../index"
import { config } from "dotenv";
import db from "../../database/models";
config()
let server;
jest.setTimeout(1000000000)

beforeEach(async () => {
    const port = process.env.APP_PORT
    await db.sequelize.authenticate()
    server = app.listen(port + 1, () => console.log("Rodando na porta de Teste"))
})

afterEach(() => {
    server.close()
})


describe('Testes na classe cursos', () => {
    it('Deve listar todos os cursos', async () => {
        const cursos = await Cursos.listarCursos()
        expect(cursos[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            nome: expect.any(String),
            carga_horaria: expect.any(Number),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    });

    it('Deve retornar um Map com informacoes dos cursos', async () => {
        const cursosMap = await Cursos.listarCursosMap()
        console.log(cursosMap);
        expect(cursosMap.get(1)).toEqual(
            expect.objectContaining({
                nome: expect.any(String),
                preco: expect.any(Number),
                carga_horaria: expect.any(Number),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            })
        )
    });
});