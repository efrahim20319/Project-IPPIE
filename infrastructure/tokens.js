import jwt from "jsonwebtoken";

function verificaTokenJWT(token, nome) {
  try {
    VerificaTokenEnviado(token, nome);
    const { id } = jwt.verify(token, process.env.CHAVE_JWT);
    VerificaValidadeToken(id, nome);
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
}

function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
  const payload = { id };
  const token = jwt.sign(payload, process.env.CHAVE_JWT, {
    expiresIn: tempoQuantidade + tempoUnidade,
  });
  return token;
}

function VerificaValidadeToken(id, nome) {
  if (!id) throw new Error(`${nome} Token Invalido`);
}

function VerificaTokenEnviado(token, nome) {
  if (!token) throw new Error(`${nome} não enviado!`);
}

const tokens = {
  verificacaoEmail: {
    nome: "Token de verificacao de email",
    expiracao: [1, "h"],
    cria(id) {
      return criaTokenJWT(id, this.expiracao);
    },
    verifica(token) {
      return verificaTokenJWT(token, this.nome);
    },
  },

};


export default tokens