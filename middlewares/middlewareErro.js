const erros = require("../errors/errors")

function criaObjetoErro(erro) {
    return { "Tipo de Erro": erro.name, "Mensagem": erro.message, "ID de Erro": erro.idErro }
}

module.exports = (erro, req, res, next) => {
    let code = 500
    if (erro instanceof erros.DadosEmFalta || erro instanceof erros.ErroDeFormato) {
        code = 400
        res.status(code).json(criaObjetoErro(erro))
        return
    }

    res.status(code).send(erro.message)
}