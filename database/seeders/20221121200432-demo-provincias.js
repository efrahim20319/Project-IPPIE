'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkInsert('Provincias', [{
      nome: 'Bengo ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Benguela ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Bié ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Cabinda',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Cuando Cubango',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Cuanza Norte',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Cuanza Sul ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Cunene',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Huambo',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Huíla',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Luanda ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Lunda Norte',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Lunda Sul',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Malanje',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Moxico',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Namibe ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Uíge',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Zaire',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provincias', null, {}); 
  }
};
