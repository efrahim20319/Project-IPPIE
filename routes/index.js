import { Router } from "express";
import telas from "./telas";
import rotasUsuario from "./usuarioRotas";
import rotasMensagem from './rotasMensagem'
import roteadorAluno from "./rotasAlunos";
import adminRoutes from "./rotasAdmin";
const roteador = Router();
const rotasAPI = [rotasUsuario, rotasMensagem, roteadorAluno, adminRoutes]
roteador.use("/api", rotasAPI); // todas as rotas da para a api começarão com o prefixo api
roteador.use("/", telas); // telas do site estarão aqui

export default roteador