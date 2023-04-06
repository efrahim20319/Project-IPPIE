import manipulaConverterList from '../../database/redis/conversao-moeda-list'

const CC = require('currency-converter-lt')

async function convert_to_Euro(valor) {
    let converterCC = new CC({
        from: 'AOA',
        to: "EUR",
        amount: valor
    })
    const valorConvertido = await converterCC.convert()
    return valorConvertido
}

export async function precoEmEuro(precoKwanza) {
    const cambio_hoje = await manipulaConverterList.buscaValor("cambio_hoje")
    if (cambio_hoje) {
        return cambio_hoje * precoKwanza
    } else {
        await calculaCambioHoje()
        const precoConvertido = await convert_to_Euro(precoKwanza)
        return precoConvertido
    }
}

async function calculaCambioHoje() { // Fazer cache do cambio de hoje
    const cambioHoje = await convert_to_Euro(1)
    await manipulaConverterList.adiciona("cambio_hoje", cambioHoje, 86400)
}