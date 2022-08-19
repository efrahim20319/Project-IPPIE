import { Router } from "express";
import telas from "./telas";
import RotasUsuario from "./usuarioRotas";
const roteador = Router();

roteador.use("/", telas); // telas do site estarão aqui
roteador.use("/api", RotasUsuario); // todas as rotas da para a api começarão com o prefixo api

export default roteador