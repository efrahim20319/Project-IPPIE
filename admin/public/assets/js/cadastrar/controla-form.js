const formulario = document.querySelector("form")
const urlParams = new URLSearchParams(window.location.search)
const port = 3333

function limpaInputs() {
    const inputs = document.querySelectorAll("input")
    for (const input of inputs) {
        input.value = ''
    }
}

formulario.addEventListener("submit", async (env) => {
    env.preventDefault()
    const termoAceitos = formulario.querySelector("input#acceptTerms").checked
    const nome = formulario.querySelector("input#yourName").value
    const email = formulario.querySelector("input#yourEmail").value
    const password = formulario.querySelector("input#yourPassword").value
    const dados = {
        nome,
        email,
        password
    }
    if (termoAceitos) {
        const requisicao = await fetch(`http://localhost:${port}/api/admin/signin?token=${urlParams.get('token')}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados),
            credentials: "include"
        })

        if (requisicao.ok) {
            await Swal.fire(
                'Bom Trabalho!',
                'Conta Criada com sucesso!',
                'success'
            )
            window.location.replace(`/entrar?user_email=${email}`)
            return
        }
        const { erro } = await requisicao.json()
        if (erro && erro.idErro === 3) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: erro.mensagem
            })
            limpaInputs()
        }
    }
})