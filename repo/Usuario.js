import SQLError from "../errors/SQLError";
const database = require("../database/models/index")

export default class Usuario {
  static async adiciona(dados) {
    try {
      await database.Usuarios.create(dados)
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async pegarPorId(id) {
    try {
      return await database.Usuarios.findByPk(Number(id))
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async deleta(id) {
    try {
      await database.Usuarios.destroy({
        where: {
          id
        }
      })
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async atualiza(dados, id) {
    try {
      await database.Usuarios.update(dados, {
        where: {
          id
        }
      })
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async lista() {
    try {
      return await database.Usuarios.findAll()
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async pegarPorEmail(email) {
    try {
      return await database.Usuarios.findOne({
        where: {
          email
        }
      })
    } catch (error) {
      throw new SQLError(error.message)
    }
  }

  static async modificaEmailVerificado(email) {
    try {
      await database.Usuarios.update({ emailVerificado: true }, {
        where: {
          email
        }
      })
    } catch (error) {
      throw new SQLError(error.message)
    }
  }
}
