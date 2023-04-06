import moment from "moment";
const { QueryTypes } = require("sequelize");
import SQLError from "../errors/SQLError";
import UsuarioJaCadastrado from "../errors/UsuarioJaCadastrado";
import utils from "../infrastructure/utils";

const database = require("../database/models");

export default class AlunoRepo {
  static async adiciona(dados) {
    try {
      await database.Alunos.create(dados);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        //Deve ser melhorado
        for (const erro of error.errors) {
          if (erro.message == "email must be unique")
            throw new UsuarioJaCadastrado(erro.path, erro.value);
          if (erro.message == "numero_BI must be unique")
            throw new UsuarioJaCadastrado(erro.path, erro.value);
        }
      }
      throw new SQLError(error.message);
    }
  }

  static async pegaCadastradosUltimosDias(numero_de_dias) {
    const query = ` Select count(*) as Total from Alunos
    where createdAt like '+*+*%'`
    const queryFinal = utils.unificadorQueries(numero_de_dias, query) //unificadorQueries(numero_de_dias, query)
    return await database.sequelize.query(queryFinal, {
        type: QueryTypes.SELECT,
    })
}

  static async pegarPorEmail(email) {
    return await database.Alunos.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  static async pegarPorCampo(campo, valor) {
    return await database.Alunos.findOne({
      where: {
        [campo]: valor,
      },
      raw: true,
    });
  }

  static async matriculas(aluno_id, raw = false) {
    const matriculas = await database.Matriculas.findAll({
      include: {
        model: database.Alunos,
        required: true,
      },
      where: {
        aluno_id,
      },
      raw,
    });
    return matriculas;
  }

  static async obterMatriculasEhCurso(aluno_id, raw = false) {
    //Ha uma confusao aqui
    const matriculas = await database.Alunos.findAll({
      include: [
        {
          model: database.Matriculas,
          required: true,
        },
        {
          model: database.Cursos,
          required: true,
        },
        {
          model: database.Provincias,
          required: true,
        },
      ],
      where: {
        id: aluno_id,
      },
      raw,
    });
    return matriculas;
  }

  static async atualizarComprovativo(comprovativo, email) {
    await database.Alunos.update(
      { comprovativo_img: comprovativo },
      { where: { email } }
    );
  }

  static async alunoPreCadastrado(email) {
    const aluno = await database.Alunos.findOne({
      include: [
        {
          model: database.Cursos,
          required: true,
        },
        {
          model: database.Provincias,
          required: true,
        },
      ],
      where: {
        email,
      },
      raw: false,
    });
    return aluno;
  }

  static async calculaTotal() {
    const total = await database.Alunos.count();
    return total;
  }
}
