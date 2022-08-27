import { Router } from "express";

export const rotasCursos = Router();
rotasCursos.get("/eletricidade-baixa-tensao", (_req, res) => {
    res.status(200).render("eletricidade-baixa-tensao");
});
rotasCursos.get("/informatica-tecnica", (_req, res) => {
    res.status(200).render("informatica-tecnica");
});
rotasCursos.get("/gestao-sistemas", (_req, res) => {
    res.status(200).render("gestao-sistemas");
});
rotasCursos.get("/metalomecanica-torneiro", (_req, res) => {
    res.status(200).render("metalomecanica-torneiro");
});
rotasCursos.get("/maquinas-motores", (_req, res) => {
    res.status(200).render("maquinas-motores");
});
rotasCursos.get("/desenhador-projetista", (_req, res) => {
    res.status(200).render("desenhador-projetista");
});
rotasCursos.get("/instalacoes-eletricas", (_req, res) => {
    res.status(200).render("instalacoes-eletricas");
});
