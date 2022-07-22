module.exports = class DadosEmFalta extends Error {
  constructor(campo) {
    let mensagem;
    campo
      ? (mensagem = `Campo ${campo} não foi enviado`)
      : (mensagem = "Não foram enviados dados");
    super(mensagem);
    this.name = "Dados em falta";
    this.idErro = 1;
  }
};