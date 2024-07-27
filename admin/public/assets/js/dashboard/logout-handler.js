const formulario = document.querySelector("#logoutLink")
// const port = 3333
formulario.addEventListener("submit", async (env) => {
    env.preventDefault()
    const requisicao = await fetch(`http://localhost:${3333}/api/admin/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include" //Para enviar outras informacoes na requesicao, como os cookies
    })
    if (requisicao.ok) {
        window.location.replace("/entrar") 
    }
})