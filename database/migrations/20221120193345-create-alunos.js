'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alunos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_BI: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      endereco: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_nascimento: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nome_pai: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome_mae: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      provincia_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Provincias", key: "id" }
      },
      curso_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Cursos", key: "id" }
      },
      foto_perfil: {
        allowNull: false,
        type: Sequelize.STRING
      },
      BI_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      certificado_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comprovativo_img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alunos');
  }
};