import { Router } from "express";
import ControladorMensagem from "../controller/Mensagem";


const roteador = Router()

roteador.route('/mensagem')
    .post(ControladorMensagem.adicionarMensagem)
    .get(ControladorMensagem.listarMensagens)

roteador.route('/mensagem/:id')
    .get(ControladorMensagem.pegarPorId)

export default roteador 