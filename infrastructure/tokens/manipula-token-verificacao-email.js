import { criaTokenJWT, verificaTokenJWT } from "./manipula-access-token";

export default {
    nome: "Token de verificacao de email",
    expiracao: [1, "h"],
    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },
    async verifica(token) {
      return await verificaTokenJWT(token, this.nome);
    }
}