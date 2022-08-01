const Usuario = require("../model/Usuario");

module.exports = {
  criarUsuario: async (req, res, next) => {
    //rota para cadastrar usuario, não vi necessidade de encriptar os dados
    try {
      const { nome, email, numero_telefone } = req.body;
      const usuario = new Usuario(nome, email, numero_telefone);
      await usuario.valida();
      await usuario.adiciona();
      res.status(201).end();
    } catch (erro) {
      next(erro);
    }
  },
  listarUsuarios: async (req, res) => {
    const dados = await Usuario.lista();
    res.status(200).json(dados);
  },
  obterPorID: async (req, res, next) => {
    try {
      const id = Number(req.params[0]);
      const dados = await Usuario.pegarPorId(id);
      const usuario = dados[0]
      res.status(200).json({ usuario });
    } catch (erro) {
      next(erro)
    }
  },
  deletarPorID: async (req, res, next) => {
    try {
      const id = Number(req.params[0]);
      await Usuario.deleta(id);
      res.status(204).end();
    } catch (erro) {
      next(erro)
    }
  },
  atualizarPorID: async (req, res, next) => {
    try {
      const id = Number(req.params[0]);
      const { nome, email, numero_telefone } = req.body;
      const usuario = new Usuario(nome, email, numero_telefone);
      await usuario.atualiza(id);
      res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  },
  obterPorEmail: async (req, res, next) => {
    try {
      const email = req.params[0];
      const dados = await Usuario.pegarPorEmail(email);
      const usuario = dados[0]
      res.status(200).json({ usuario });
    } catch (erro) {
      next(erro);
    }
  },
};
