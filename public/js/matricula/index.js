const inputsFile = document.querySelectorAll("input[type=file]")
inputsFile.forEach(input => {
    const outerDiv = input.parentNode.parentNode
    const ol = document.createElement("ol")
    let p = outerDiv.querySelector('p')
    input.addEventListener("change", (event) => {
        if (input.files.length != 0) {
            for (const file of input.files) {
                if (!arquivoEhValido(file)) {
                    limpaInput()
                    return
                }
                ol.innerHTML = ''
                const fileInfo = getFileInfo(file)
                let imgWrapper = document.createElement('div')
                const li = document.createElement('li')
                const image = document.createElement('img')
                image.src = URL.createObjectURL(file)
                imgWrapper.append(image, fileInfo)
                li.appendChild(imgWrapper)
                ol.appendChild(li)
                outerDiv.appendChild(ol)
                p.classList.add('esconde')
                input.classList.add('esconde')
            }
        } else {
            limpaInput()
        }

        function limpaInput() {
            ol.innerHTML = ''
            p.classList.remove('esconde')
            input.value = ''
            return
        }

        function arquivoEhValido(file) {
            if (!validFileType(file)) {
                alert("Tipo de arquivo invalido.")
                return false
            }
            if (file.size >= 2097152) {
                alert("Tamanho damasiado longo.")
                return false
            }
            return true
        }
    })
})

function getFileInfo(file) {
    let fileInfo = document.createElement('div')
    let size = returnFileSize(file.size)
    let sizeSpan = document.createElement('span')
    sizeSpan.innerText = 'Tamanho: ' + size
    let name = file.name
    let nameSpan = document.createElement('span')
    nameSpan.innerText = `Nome: ${ String(name).substring(0, 10)}...`
    fileInfo.append(sizeSpan, nameSpan)
    return fileInfo
}

function returnFileSize(number) {
    if (number < 1024) {
        return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
    }
}

const fileTypes = [
    "image/apng",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/webp",
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}