'use strict';
const { faker } = require('@faker-js/faker');
const { resolve } = require('path');
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const retornaAlunos = function(quantidade) {
    return new Promise((resolve, reject) => {
        try {
            let alunos = []
            for (let index = 0; index < quantidade; index++) {
                alunos.push({
                    nome: faker.name.fullName(),
                    numero_BI: faker.address.countryCode(),
                    endereco: faker.address.city(),
                    data_nascimento: '2022-12-14 00:00:00',
                    nome_pai: faker.name.fullName(),
                    nome_mae: faker.name.fullName(),
                    numero_telefone: '+244949856976',
                    email: faker.internet.email(),
                    provincia_id: getRndInteger(1, 18),
                    curso_id: getRndInteger(1, 7),
                    foto_perfil: faker.image.imageUrl(50),
                    BI_img: faker.image.imageUrl(50),
                    certificado_img: faker.image.imageUrl(50),
                    comprovativo_img: faker.image.imageUrl(50),
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            }
            resolve( alunos)
        } catch(erro) {
            reject(erro)
        }
    })
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const alunos = await retornaAlunos(16)
        /**
         * Add seed commands here.
         *
         * Example:*/
        await queryInterface.bulkInsert('Alunos', alunos, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Cursos', null, {});
    }
};
