import Usuario from "../model/Usuario";
import tokens from "../infrastructure/tokens";
import passport from "passport";
import Admin from "../model/Admin"

export default class MiddlewaresAutenticacao {
  static async local(req, res, next) {
    passport.authenticate("local", { session: false },
      (erro, usuario, info) => {
        if (erro) return next(erro)
        if (!usuario) return res.status(401).json()
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

  static async refresh(req, _res, next) {
    try {
      const { refresh_token } = req.body
      const id = await tokens.refresh.verifica(refresh_token)
      await tokens.refresh.invalida(refresh_token)
      const admin = await Admin.pegarPorId(id)
      req.user = admin
      return next()
    } catch (error) {
      return next(error)
    }
  }

  static async verificacaoEmail(req, res, next) {
    try {
      const { token } = req.params;
      const id = tokens.verificacaoEmail.verifica(token);
      const usuario = await Usuario.pegarPorId(id);
      req.user = usuario;
      return next();
    } catch (erro) {
      return next(erro)
    }
  }
}
