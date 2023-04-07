import { it, expect, beforeEach, afterEach } from "@jest/globals"
import app from "../../app"
import { config } from "dotenv";
import db from "../../database/models";
import ConexaoListas, { fecharConexoesListas } from "../../database/redis/conexaoListas";
import { SuperAdminModel } from "../../model/SuperAdminModel";
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


describe('Testes em Super Admin', () => {
    it('Deve retornar uma instancia de Super Admin', async () => {
        const superAdmin = await SuperAdminModel.obterSuperAdmin()
        expect(superAdmin).toBeInstanceOf(SuperAdminModel)
    });
});