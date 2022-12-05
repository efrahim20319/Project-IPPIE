const formulario = document.querySelector("form")
formulario.addEventListener("submit", async (env) => { 
    env.preventDefault()
    const email = formulario.querySelector("#yourUsername").value
    const password = formulario.querySelector("#yourPassword").value
    const dados = {
        email,
        password
    }
    const requisicao = await fetch("http://localhost:3333/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
        redirect: "follow"
    })
    // const resposta = await requisicao.json()
    if (requisicao.ok)
        window.location.href = "/"

})