import { Router } from "express";
import telas from "./telas.js";

const roteador = Router()

roteador.use('/', telas)

export default roteador