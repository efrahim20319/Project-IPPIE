'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Usuarios', 'email', {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Usuarios', 'email', {
        unique: false,
        allowNull: false,
        type: Sequelize.STRING
    });
  }
};