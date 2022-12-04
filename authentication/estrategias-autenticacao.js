import passport from "passport";
import bearer from "passport-http-bearer"
import local from "passport-local"
import InvalidArgumentError from "../errors/InvalidArgumentError";
import Admin from "../model/Admin";
import bcrypt from "bcrypt"
import tokens from "../infrastructure/tokens";

function verificaAdmin(admin) {
    if (!admin) throw new InvalidArgumentError("Dados enviados incorretos")
}

async function verificaSenha(senha, senhaHash) {
    const senhaEhValida = await bcrypt.compare(senha, senhaHash)
    if (!senhaEhValida) throw new InvalidArgumentError("Dados enviados incorretos")
}

const localStrategy = new local.Strategy({
    usernameField: "email",
    passwordField: "password",
    session: false
}, async (email, password, done) => {
    try {
        const admin = await Admin.pegarPorEmail(email)
        verificaAdmin(admin)
        await verificaSenha(password, admin.password)
        done(null, admin)
    } catch (error) {
        done(error)
    }
})

const bearerStrategy = new bearer.Strategy(async (token, done) => {
    try {
        const id = await tokens.access.verifica(token)
        const admin = await Admin.pegarPorId(id)
        done(null, admin, { token })
    } catch (error) {
        done(error)
    }
})

passport.use(localStrategy)
passport.use(bearerStrategy)