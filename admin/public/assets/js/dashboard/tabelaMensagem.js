const port = 3333

async function listarMensagens() {
    const response = await fetch(`http://localhost:${port}/api/mensagem`)
    return await response.json() 
}

function criaLinhaMensagem(mensagem) {
    let formatadorData = Intl.DateTimeFormat('pt-pt', {
        dateStyle: 'short'
    })
    const linha = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdAutor = document.createElement('td')
    const tdEmail = document.createElement('td')
    const tdData = document.createElement('td')
    tdId.innerHTML = `<a href='/mensagem/id/${mensagem.id}'>${mensagem.id}</a>`
    tdAutor.innerText = mensagem.nome
    tdEmail.innerText = mensagem.email
    tdData.innerHTML = formatadorData.format(new Date(mensagem.createdAt))
    linha.append(tdId, tdAutor, tdEmail, tdData)
    return linha
}

listarMensagens().then(dados => {
    console.log(dados);
})

const tBodyMensagens = document.querySelector("#table-msg__body")

export async function renderListaMensagem() {
    const mensagens = await listarMensagens()
    for (const mensagem of mensagens) {
        tBodyMensagens.append(criaLinhaMensagem(mensagem))
    }
}
