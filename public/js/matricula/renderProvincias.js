const selectProvincia = document.querySelector('select#inputProv')
const selectCurso = document.querySelector('select#inputCurso')
const port = 3333;

async function pegaRecurso(recurso) {
    const response = await fetch(`http://localhost:${port}/api/${recurso}`) //pode ser cachead
    const provincias = await response.json()
    return provincias
}

function criaOption (provincia) {
    const option = document.createElement('option')
    option.value = provincia.id
    option.innerHTML = provincia.nome
    return option
}


async function renderOption(recurso, select) {
    const provincias = await pegaRecurso(recurso)
    for (const provincia of provincias) {
        const option = criaOption(provincia)
        select.append(option)
    }
}

renderOption('provincias', selectProvincia).then(() => {

})

renderOption('cursos', selectCurso).then(() => {

})