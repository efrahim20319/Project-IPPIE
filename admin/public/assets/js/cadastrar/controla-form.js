const formulario = document.querySelector("form")
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
        const requisicao = await fetch("http://localhost:3333/api/admin/signin", {
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
            window.location.href = `/entrar?user_email=${email}`
        }
        else {
            console.log(await requisicao.json());
        }
    }
})