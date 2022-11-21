import tokens from "../infrastructure/tokens";
import Usuario from "../model/Usuario";
import EmailVerificacao from "../services/EmailVerificacao";

function geraEndereco(rota, token) {
  const base_url = process.env.BASE_URL;
  return `${base_url}/${rota}/${token}`;
}

export default class UsuarioControlador {
  static async criarUsuario(req, res, next) {
    //rota para cadastrar usuario, não vi necessidade de encriptar os dados
    try {
      const { nome, email, numero_telefone } = req.body;
      const usuario = new Usuario(nome, email, numero_telefone);
      await usuario.valida();
      await usuario.adiciona();
      UsuarioControlador.enviarEmailVerificacao(usuario);
      res.status(201).end();
    } catch (erro) {
      next(erro);
    }
  }

  static enviarEmailVerificacao(usuario) {
    const tokenVerificacao = tokens.verificacaoEmail.cria(usuario.id);
    const endereco = geraEndereco(
      "api/usuario/verifica_email",
      tokenVerificacao
    );
    const emailVerificacao = new EmailVerificacao(usuario, endereco);
    emailVerificacao
      .enviaEmail()
      .catch((erro) => {
        console.error("Erro ao enviar email", erro);
      });
  }

  static async modificaEmail(req, res) {
    try {
      const usuario = req.user;
      await usuario.modificaEmailEnviado();
      console.log(`Usuario ${usuario.nome} verificado com sucesso`);
      res.status(200).end();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async listarUsuarios(req, res) {
    const dados = await Usuario.lista();
    res.status(200).json(dados);
  }

  static async obterPorID(req, res, next) {
    try {
      const id = Number(req.params[0]);
      const usuario = await Usuario.pegarPorId(id);
      res.status(200).json({ usuario });
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarPorID(req, res, next) {
    try {
      const id = Number(req.params[0]);
      await Usuario.deleta(id);
      res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarPorID(req, res, next) {
    try {
      const id = Number(req.params[0]);
      const { nome, email, numero_telefone } = req.body;
      const usuario = new Usuario(nome, email, numero_telefone);
      await usuario.atualiza(id);
      res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  }

  static async obterPorEmail(req, res, next) {
    try {
      const email = req.params[0];
      const usuario = await Usuario.pegarPorEmail(email);
      res.status(200).json({ usuario });
    } catch (erro) {
      next(erro);
    }
  }
}
