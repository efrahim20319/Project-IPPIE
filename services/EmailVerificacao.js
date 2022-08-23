import Email from "./Email";
export default class EmailVerificacao extends Email {
  constructor(usuario, endereco) {
    super();
    this.from =
      '"Instituto Politécnico Privado e Industrial Evolução" <efrahimtks@gmail.com>';
    this.to = usuario.email;
    this.subject = "Verificação de Email";
    this.text = "";
    this.html = `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href="http://${endereco}">${endereco}</a>`;
  }
}
