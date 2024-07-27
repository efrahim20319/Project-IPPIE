const formulario = document.querySelector('form')
const port = 3333


formulario.addEventListener('submit', async function (event) {
    event.preventDefault()
    const senha = this.querySelector('input').value
    const request = await fetch(`http://localhost:${port}/api/sp-admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senha: senha,
        }),
    })
    if (request.ok) {
        const response = await request.json()
        const { token } = response
        window.location.replace(`/cadastrar?token=${token}`)
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha Incorreta',
        })
    }
})
