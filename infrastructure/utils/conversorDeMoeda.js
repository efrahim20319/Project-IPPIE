const CC = require('currency-converter-lt')

export default async function precoEmEuro(valor) {
    let converterCC = new CC({
        from: 'AOA',
        to: "EUR",
        amount: valor    
    })
    const valorConvertido = await converterCC.convert()
    return valorConvertido
}