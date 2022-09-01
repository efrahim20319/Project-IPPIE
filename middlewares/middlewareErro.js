import erros from "../errors"

function criaObjetoErro(erro) {
    return { "tipo": erro.name, "mensagem": erro.message, "idErro": erro.idErro }
}

export default (erro, req, res, next) => {
    let code = 500
    if (erro instanceof erros.DadosEmFalta || erro instanceof erros.ErroDeFormato) {
        code = 400
    }

    if (erro instanceof erros.UsuarioNaoEncontrado)
        code = 404

    if (erro instanceof erros.EmailJaCadastrado) {
        code = 406
    }

    res.status(code).send({ erro: criaObjetoErro(erro) })
}