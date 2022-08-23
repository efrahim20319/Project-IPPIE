import nodemailer from "nodemailer";

const configuracaoEmailProducao = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
};

function configuracaoEmailTeste(contaTeste) {
  return {
    host: "smtp.ethereal.email",
    auth: contaTeste,
  };
}

async function criaConfiguracaoEmail() {
  try {
    if (process.env.NODE_ENV === "production"){
      return configuracaoEmailProducao;
    } 
    const contaTeste = await nodemailer.createTestAccount();
    return configuracaoEmailTeste(contaTeste);
  } catch (erro) {
    throw new Error(erro.message);
  }
}

export default class Email {
  async enviaEmail() {
    const configuracaoEmail = await criaConfiguracaoEmail();
    const transportador = nodemailer.createTransport(configuracaoEmail);
    const info = await transportador.sendMail(this);
    if (process.env.NODE_ENV !== "production") {
      console.log("URL:", nodemailer.getTestMessageUrl(info));
    }
  }
}
