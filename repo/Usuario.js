import executaQuery from "../database/executaQuery";
import SQLError from "../errors/SQLError";

export default class Usuario {
  static async adiciona(dados) {
    try {
      const query = "INSERT INTO Usuario SET ?";
      await executaQuery(query, dados);
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async pegarPorId(id) {
    try {
      const query = "SELECT * FROM Usuario WHERE codigo = ?";
      return await executaQuery(query, id);
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async deleta(id) {
    try {
      const query = "DELETE FROM Usuario WHERE codigo = ?";
      await executaQuery(query, id);
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async atualiza(dados, id) {
    try {
      const query = "UPDATE Usuario SET ? WHERE codigo = ?";
      await executaQuery(query, [dados, id]);
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async lista() {
    try {
      const query = "SELECT codigo, nome, email, numero_telefone, emailVerificado FROM Usuario;";
      return await executaQuery(query);
    } catch (error) {
      throw new SQLError(error.message);
    }
  }

  static async pegarPorEmail(email) {
    try {
      const query = "SELECT * FROM Usuario WHERE email = ? LIMIT 1";
      return await executaQuery(query, email);
    } catch (error) {
        throw new SQLError(error.message)
    }
  }

  static async modificaEmailVerificado(email) {
    try {
      const query = "UPDATE Usuario SET emailVerificado = 1 WHERE email = ?"
      await executaQuery(query, email)
    } catch (error) {
      throw new SQLError(error.message)
    }
  }
}
