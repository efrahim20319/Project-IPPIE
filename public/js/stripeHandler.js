const button = document.querySelector("button")

button.addEventListener("click", () => {
    fetch("/api/create-checkot-session", { //Esta rota retorna uma url para completar o paganebto com o stripe
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                { id: 3, quantidade: 1 },
                { id: 5, quantidade: 2 },
                { id: 7, quantidade: 3 }
            ]
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