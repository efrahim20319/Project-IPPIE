import Email from "./Email";
export default class EmailVerificacao extends Email {
  constructor(usuario, endereco) {
    const nomeCompleto = String(usuario.nome).split(" ")
    const [primeiroNome, ultimoNome] = [nomeCompleto[0], nomeCompleto[nomeCompleto.length - 1]]
    const nome = `${primeiroNome} ${ultimoNome}`
    super();
    this.from =
      '"Instituto Politécnico Privado e Industrial Evolução" <efrahimtks@gmail.com>';
    this.to = usuario.email;
    this.subject = "Verificação de Email";
    this.text = "";
    this.html = `<h1>Olá ${nome}!</h1>
    <p>Obrigado por cadastra-se no IPPIE e fazer parte da nossa comunidade.</p>
    Verifique seu e-mail clicando <a href="${endereco}">aqui</a>`;
  }
}
