'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matriculas.belongsTo(models.Alunos, {
        foreignKey: "aluno_id"
      })
    }
  }
  Matriculas.init({
    status: DataTypes.ENUM("confirmado", "pendente", "cancelado"),
    pago: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Matriculas',
  });
  return Matriculas;
};