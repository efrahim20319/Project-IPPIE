const button = document.querySelector("#stripe")
const urlParams = new URLSearchParams(window.location.search)

button.addEventListener("click", async () => {
    const response = await fetch(`/api/alunos/email/${urlParams.get('email')}`)
    const { aluno } = await response.json()
    fetch("/api/create-checkot-session", { //Esta rota retorna uma url para completar o paganebto com o stripe
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                { id: aluno.Curso.id, quantidade: 1 },
            ],
            email: urlParams.get('email')
        })
    })
        .then(async (res) => {
            if (res.ok) return res.json()
            const json = await res.json()
            return await Promise.reject(json)
        })
        .then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.error(e.message);
        })
})