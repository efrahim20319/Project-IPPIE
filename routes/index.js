import { Router } from "express";
import telas from "./telas";
import rotasUsuario from "./usuarioRotas";
import rotasMensagem from './rotasMensagem'
const roteador = Router();

roteador.use("/api", rotasUsuario, rotasMensagem); // todas as rotas da para a api começarão com o prefixo api
roteador.use("/", telas); // telas do site estarão aqui

export default roteador