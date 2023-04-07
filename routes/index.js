import { Router } from "express";
import telas from "./screens/telas.js";
import rotasUsuario from "./usuarioRotas";
import rotasMensagem from './rotasMensagem'
import roteadorAluno from "./rotasAlunos";
import adminRoutes from "./rotasAdmin";
import rotasPagamento from "./rotasPagamento.js";
import rotasProvincias from "./rotasProvincias.js";
import rotasCursos from "./rotasCursos.js";
import roteadorDados from "./rotasDados.js";
import roteadorMatriculas from "./rotasMatriculas.js";
import rotasSuperAdmin from "./rotasSuperAdmin.js";


const roteador = Router();
const rotasAPI = [
    rotasCursos,
    adminRoutes,
    rotasUsuario,
    roteadorAluno,
    roteadorDados,
    rotasMensagem,
    rotasPagamento,
    rotasProvincias,
    rotasSuperAdmin,
    roteadorMatriculas
]
roteador.use("/api", rotasAPI); // todas as rotas da para a api começarão com o prefixo api
roteador.use("/", telas); // telas do site estarão aqui

export default roteador