import Usuario from "../model/Usuario";
import tokens from "../infrastructure/tokens";

export default class MiddlewaresAutenticacao {
  static async verificacaoEmail(req, res, next) {
    try {
      const { token } = req.params;
      const id = tokens.verificacaoEmail.verifica(token);
      const usuario = await Usuario.pegarPorId(id);
      req.user = usuario;
      return next();
    } catch (erro) {
      if (erro.message === "TokenExpiredError")
        return res
          .status(401)
          .json({ erro: erro.message, "Expirado em": erro.expiredAt });

      if (erro.message === "JsonWebTokenError")
        return res.status(401).json(erro.message);

      return res.status(500).json(erro.message);
    }
  }
}
