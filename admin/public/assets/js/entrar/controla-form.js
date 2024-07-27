const formulario = document.querySelector("form")
const port = 3333

formulario.addEventListener("submit", async (env) => {
    env.preventDefault()
    const email = formulario.querySelector("#yourUsername").value
    const password = formulario.querySelector("#yourPassword").value
    const dados = {
        email,
        password
    }
    const requisicao = await fetch(`http://localhost:${port}/api/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
        credentials: "include"
    })
    if (requisicao.ok) {
        window.location.replace("/")
    } 
    else if (requisicao.status === 401) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email ou senha incorretos!'
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: requisicao.statusText
        })
    }
})