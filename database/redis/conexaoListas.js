import { allowlist } from "./allowlist-refresh-token";
import { blockList } from "./blocklist-access-token";

const listas = [
    {
        nome: "Allowlist",
        valor: allowlist
    },
    {
        nome: "Blocklist",
        valor: blockList
    }
]

export default async function ConexaoListas() {
    for (const lista of listas) {
        try {
            await lista.valor.connect()
            console.log(`${lista.nome} conectada com sucesso`);
        } catch (error) {
            console.error(`Erro ao conectar a ${lista.nome}`);
            continue
        }
    }
}