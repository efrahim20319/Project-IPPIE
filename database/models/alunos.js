'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alunos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alunos.hasMany(models.Matriculas, {
        foreignKey: "aluno_id"
      })

      Alunos.belongsTo(models.Cursos, {
        foreignKey: "curso_id"
      })

      Alunos.belongsTo(models.Provincias, {
        foreignKey: "provincia_id"
      })
    }
  }
  Alunos.init({
    nome: DataTypes.STRING,
    numero_BI: DataTypes.STRING,
    endereco: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    nome_pai: DataTypes.STRING,
    nome_mae: DataTypes.STRING,
    numero_telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    provincia_id: DataTypes.INTEGER,
    curso_id: DataTypes.INTEGER,
    foto_perfil: DataTypes.STRING,
    BI_img: DataTypes.STRING,
    certificado_img: DataTypes.STRING,
    comprovativo_img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Alunos',
  });
  return Alunos;
};