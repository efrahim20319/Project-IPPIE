import axios from "axios";
import { Router } from "express";

const telas = Router()

async function tokenIsValid(token) {
    const response = await axios.post("http://localhost:3333/api/admin/tokensValidos", {}, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
    const statusCode = response.status
    return statusCode >= 200 && statusCode < 300
}

telas.get("/", async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (await tokenIsValid(token))
            return res.render("dashboard")
        return res.render("entrar")
    } catch (error) {
        res.redirect("/entrar")
        console.error(error);
    }
})
telas.get("/entrar", (_req, res) => {
    res.status(200).render('entrar')
})
telas.get("/cadastrar", (_req, res) => {
    res.status(200).render('cadastrar')
})

export default telas