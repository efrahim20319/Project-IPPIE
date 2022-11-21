'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provincias.hasMany(models.Alunos, {
        foreignKey: "provincia_id"
      })
    }
  }
  Provincias.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Provincias',
  });
  return Provincias;
};