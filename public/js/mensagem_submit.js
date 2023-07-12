const form = document.querySelector(".form-mensagem")
form.addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputNome = form.querySelector("input#name")
    const inputEmail = form.querySelector("input#email")
    const inputMensagem = form.querySelector("textarea")
    const nome = inputNome.value
    const email = inputEmail.value
    const mensagem = inputMensagem.value
    try {
        const resposta = await fetch("/api/mensagem", {
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
        if (resposta.ok) {
            Swal.fire(
                'Mensagem enviada com sucesso!',
                'Será respondido por email em instantes.',
                'success'
            )
        } else {
            console.log(resposta);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Erro ao enviar mensagem`,
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Erro ao enviar mensagem`,
            // footer: '<a href="">Why do I have this issue?</a>'
        })
    }
    limparInputs([inputEmail, inputMensagem, inputNome])
})