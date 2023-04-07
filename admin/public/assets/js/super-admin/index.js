const formulario = document.querySelector('form')
console.log('123', formulario);

formulario.addEventListener('submit', async function (event) {
    event.preventDefault()

    const senha = this.querySelector('input').value
    const request = await fetch('http://localhost:3333/api/sp-admin/login', {
        method: "POST",
        body: JSON.stringify({
            senha
        })
    })
    console.log(senha);
    if (request.ok) {
        const response = await request.json()
        const { token } = response
        console.log(token);
    } else {
        console.log(request);
    }


})