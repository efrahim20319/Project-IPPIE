'use strict';
const { faker } = require('@faker-js/faker');
const { resolve } = require('path');
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let matriculasStatus = ["confirmado", "pendente", "cancelado"]

const retornaMatriculas = function(quantidade) {
    return new Promise((resolve, reject) => {
        try {
            let matriculas = []
            for (let index = 0; index < quantidade; index++) {
                matriculas.push({
                    status: matriculasStatus[getRndInteger(0, 2)],
                    aluno_id: getRndInteger(1, 10),
                    pago: faker.datatype.boolean(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            }
            resolve( matriculas)
        } catch(erro) {
            reject(erro)
        }
    })
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const matriculas = await retornaMatriculas(10)
        /**
         * Add seed commands here.
         *
         * Example:*/
        //await queryInterface.bulkInsert('Matriculas', matriculas, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Matriculas', null, {});
    }
};
