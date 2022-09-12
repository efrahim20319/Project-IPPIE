import { Router } from "express";
import ControladorMensagem from "../controller/Mensagem";


const roteador = Router()

roteador.route('/mensagem')
    .post(ControladorMensagem.adicionarMensagem)

export default roteador 