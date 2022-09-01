const formulario = document.querySelector(".form_contacto")
function limparInputs(inputs) {
    for (const input of inputs) {
        input.value = ""
    }
}
formulario.addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputNome = formulario.querySelector("input#name")
    const inputEmail = formulario.querySelector("input#email")
    const inputTelefone = formulario.querySelector("input#phone-number")
    const inputs = [inputNome, inputEmail, inputTelefone]
    const nome = inputNome.value
    const email = inputEmail.value
    const telefone = inputTelefone.value
    const response = await fetch("http://localhost:3000/api/usuario", {
        method: "POST",
        body: JSON.stringify({
            nome: nome,
            email: email,
            numero_telefone: telefone
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const dados = await response.json()
    const { erro } = dados
    if (erro) {
        console.log(erro);
        alert(erro.mensagem)
        limparInputs(inputs)
        return
    }
    showSwal('success-signin')
    limparInputs(inputs)
})