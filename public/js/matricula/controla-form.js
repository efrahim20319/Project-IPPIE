const formulario = document.querySelector('form')

function retornaValorInput(id, tag = 'input') {
    const input = formulario.querySelector(`${tag}#${id}`)
    console.log(input);
    return input.value
}

formulario.addEventListener('submit', async (event) => {
    event.preventDefault()
    const [nome, sobrenome] = [retornaValorInput('inputNome'), retornaValorInput('inputSobrenome')]
    const endereco = retornaValorInput('inputAddress')
    const dataNascimento = retornaValorInput('inputData')
    const municipio = retornaValorInput('inputCity')
    const provincia = retornaValorInput('inputProv', 'select')
    const [nome_pai, nome_mae] = [retornaValorInput('inputFather'), retornaValorInput('inputMother')]
    const [numero_BI, numero_telefone] = [retornaValorInput('inputBI'), retornaValorInput('inputPhone')]
    const email = retornaValorInput('inputEmail')
    const curso = retornaValorInput('inputCurso', 'select')
    const [foto_perfil, foto_BI, foto_certificado] = formulario.querySelectorAll('input[type=file]')
    const formData = new FormData()
    consfiguraFormData({ formData, nome, sobrenome, numero_BI, endereco, municipio, dataNascimento, nome_pai, nome_mae, numero_telefone, email, provincia, curso, foto_perfil, foto_BI, foto_certificado });
    const response = await fetch('/api/alunos', {
        method: 'POST',
        body: formData
    })
    console.log(response);
    if (response.ok) {
        window.localStorage.setItem('ippie_user_email', email)
        window.location = `/pagar?email=${email}`
    }
})

function consfiguraFormData({ formData, nome, sobrenome, numero_BI, endereco, municipio, dataNascimento, nome_pai, nome_mae, numero_telefone, email, provincia, curso, foto_perfil, foto_BI, foto_certificado }) {
    formData.append('nome', `${nome} ${sobrenome}`);
    formData.append('numero_BI', `${numero_BI}`);
    formData.append('endereco', `${endereco} - ${municipio}`);
    formData.append('data_nascimento', `${dataNascimento}`);
    formData.append('nome_pai', `${nome_pai}`);
    formData.append('nome_mae', `${nome_mae}`);
    formData.append('numero_telefone', `${numero_telefone}`);
    formData.append('email', `${email}`);
    formData.append('provincia_id', `${provincia}`);
    formData.append('curso_id', `${curso}`);
    formData.append('files', foto_perfil.files[0]);
    formData.append('files', foto_BI.files[0]);
    formData.append('files', foto_certificado.files[0]);
}
