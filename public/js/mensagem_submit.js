const form = document.querySelector(".form-mensagem")
console.log(form);
form.addEventListener("submit", async function(event){
    event.preventDefault()
    const inputNome = form.querySelector("input#name")
    const inputEmail = form.querySelector("input#email")
    const inputMensagem = form.querySelector("textarea")
    const nome = inputNome.value
    const email = inputEmail.value
    const mensagem = inputMensagem.value
    await fetch("http://localhost:3000/api/mensagem", {
        method: "POST",
        body: JSON.stringify({
            nome: nome,
            email: email,
            mensagem: mensagem
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    showSwal('success-message')
    limparInputs([inputEmail, inputMensagem, inputNome])
})