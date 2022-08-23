import { Router } from "express";
import UsuarioControlador from "../controller/Usuario";
import middlewares from "../middlewares";
const roteador = Router();

roteador
  .route("/usuario")
  .post(UsuarioControlador.criarUsuario)
  .get(UsuarioControlador.listarUsuarios);

roteador
  .route(/^\/usuario\/(\d+)$/)
  .get(UsuarioControlador.obterPorID)
  .delete(UsuarioControlador.deletarPorID)
  .put(UsuarioControlador.atualizarPorID);

roteador
  .route(/^\/usuario\/email\/(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$/)
  .get(UsuarioControlador.obterPorEmail);

roteador.get(
  "/usuario/verifica_email/:token",
  middlewares.MiddlewaresAutenticacao.verificacaoEmail,
  UsuarioControlador.verificaEmail
);

export default roteador;
