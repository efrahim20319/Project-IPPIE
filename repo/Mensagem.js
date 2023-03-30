const database = require("../database/models");

export default class RepositorioMensagem {
  static async adicionarMensagem(dados) {
    await database.Mensagens.create(dados);
  }

  static async listarMensagens() {
    return await database.Mensagens.findAll();
  }

  static async pegarPorId(id) {
    return await database.Mensagens.findOne({
      where: {
        id,
      },
    });
  }
}
