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
    const response = await fetch("/api/usuario", {
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
    
    if (response.ok) {
        console.log("Mister bombastic");
        window.location.href = `/sucess-signin?email=${email}`
        return
    }
    const dados = await response.json() 
    if (dados && dados.erro) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${dados.erro.mensagem}`,
            // footer: '<a href="">Why do I have this issue?</a>'
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Ocorreu um erro, tente novamente.`,
            // footer: '<a href="">Why do I have this issue?</a>'
        })
    }
    limparInputs(inputs)
})