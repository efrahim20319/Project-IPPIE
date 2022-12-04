import Usuario from "../model/Usuario";
import tokens from "../infrastructure/tokens";
import passport from "passport";

export default class MiddlewaresAutenticacao {
  static async local(req, res, next) {
    passport.authenticate("local", { session: false },
      (erro, usuario, info) => {
        if (erro) return next(erro)
        if (!usuario) return res.status(401).json({ erro: erro.message })
        req.user = usuario
        return next()
      })(req, res, next)
  }

  static async bearer(req, res, next) {
    passport.authenticate('bearer', { session: false },
      (erro, usuario, info) => {
        if (erro) return next(erro)
        if (!usuario) return res.status(400).json({ erro: erro.message })
        req.token = info.token
        req.user = usuario
        return next()
      })(req, res, next)
  }

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
