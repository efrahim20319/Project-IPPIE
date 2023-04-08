import { superAdminList } from "./super-admin-list.js"

const listas = [
    {
        nome: 'SuperAdminList',
        valor: superAdminList,
    },
]

export default async function ConexaoListas() {
    for (const lista of listas) {
        try {
            await lista.valor.connect()
            console.log(`${lista.nome} conectada com sucesso`)
        } catch (error) {
            console.error(`Erro ao conectar a ${lista.nome}`)
            continue
        }
    }
}

export async function fecharConexoesListas() {
    for (const lista of listas) {
        try {
            await lista.valor.disconnect()
            console.log(`${lista.nome} desconectada com sucesso`)
        } catch (error) {
            console.error(`Erro ao desconectar a ${lista.nome}`)
            continue
        }
    }
}
