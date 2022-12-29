import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import erros from "../errors"

function criaObjetoErro(erro) {
    return { "tipo": erro.name, "mensagem": erro.message, "idErro": erro.idErro, "expiradoEm": erro.expiredAt, "campoRepetido": erro.campoRepetido }
}

export default (erro, req, res, next) => {
    let code = 500

    // Erros na Autenticacao e na autorizacao
    if (erro && (erro instanceof erros.InvalidArgumentError || erro instanceof JsonWebTokenError || erro instanceof TokenExpiredError))
        code = 401
    //

    if (erro instanceof erros.DadosEmFalta || erro instanceof erros.ErroDeFormato) {
        code = 400
    }

    if (erro instanceof erros.UsuarioNaoEncontrado)
        code = 404

    if (erro instanceof erros.EmailJaCadastrado || erro instanceof erros.UsuarioJaCadastrado) {
        code = 406
    }

    res.status(code).send({ erro: criaObjetoErro(erro) })
}