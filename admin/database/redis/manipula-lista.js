export default function (lista) {
    return {
        async adiciona(chave, valor, dataExpiracao) {
            await lista.set(chave, valor)
            await lista.expire(chave, dataExpiracao)
        },
        async contemChave(chave) {
            const resultado = await lista.exists(chave)
            return resultado == 1
        },
        async buscaValor(chave) {
            return await lista.get(chave)
        },
        async deleta(chave) {
            await lista.del(chave)
        }
    }
}