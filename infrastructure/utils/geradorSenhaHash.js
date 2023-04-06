import bcrypt from "bcrypt"
export async function geradorSenhaHash(senha) {
    const custoHash = 12
    return await bcrypt.hash(senha, custoHash)
}