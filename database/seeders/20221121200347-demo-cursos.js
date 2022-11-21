'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Cursos', [{
      nome: 'Técnico de Informática',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Gestão de Sistemas Informáticos',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Máquinas e Motores',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Metalomecânica e Torneiro',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Desenhador Projetista',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nome: 'Energias e Instalações Elétricas',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Eletricidade de Baixa Tensão',
      carga_horaria: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cursos', null, {}); 
  }
};
