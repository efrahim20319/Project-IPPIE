import { promisify } from "util"

export default function (lista)  {
    const setAsync = promisify(lista.set).bind(lista)
    const existsAsync = promisify(lista.exists).bind(lista)
    const getAsync = promisify(lista.get).bind(lista)
    const delAsync = promisify(lista.del).bind(lista)

    return {
        async adiciona(chave, valor, dataExpiracao) {
            await setAsync(chave, valor)
            await lista.expire(chave, dataExpiracao)
        },
        async contemChave(chave) {
            const resultado = await existsAsync(chave)
            return resultado === 1
        },
        async buscaValor(chave) {
            return await getAsync(chave)
        },
        async deleta(chave) {
            await delAsync(chave)
        }
    }
}