const erros = require("../errors/errors")

function criaObjetoErro(erro) {
    return { "Tipo de Erro": erro.name, "Mensagem": erro.message, "ID de Erro": erro.idErro }
}

module.exports = (erro, req, res, next) => {
    let code = 500
    if (erro instanceof erros.DadosEmFalta || erro instanceof erros.ErroDeFormato) {
        code = 400
    }
    if (erro instanceof erros.EmailJaCadastrado) {
        code = 406
    }

    res.status(code).send(criaObjetoErro(erro))
}