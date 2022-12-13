import Cursos from "../../model/Cursos";
import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../index"
import { config } from "dotenv";
import db from "../../database/models";
config()
let server;

beforeEach(async () => {
    const port = process.env.APP_PORT
    await db.sequelize.authenticate()
    server = app.listen(port+1, () => console.log("Rodando na porta de Teste"))
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
});
