import { criaTokenJWT, verificaTokenJWT } from "./manipula-access-token";

export default {
    nome: "Token de pagamento",
    expiracao: [1, "y"],
    cria(email) {
      return criaTokenJWT(email, this.expiracao);
    },
    async verifica(token) {
      return await verificaTokenJWT(token, this.nome);
    }
}