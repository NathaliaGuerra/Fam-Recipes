'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt');

const users = [...Array(50)].map((user) =>(
    {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password:  bcrypt.hashSync('password', bcrypt.genSaltSync(10), null),
        role: 'Registered',
        createdAt: new Date(),
        updatedAt: new Date()
    }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      // Admin User
      await queryInterface.bulkInsert('Users', [{
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@fam-recipes.com',
        password:  bcrypt.hashSync('password', bcrypt.genSaltSync(10), null),
        role: 'Admin',
        avatar: 'default_user.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
      // Registered User for test
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Registered',
      lastName: 'Registered',
      email: 'user@fam-recipes.com',
      password:  bcrypt.hashSync('password', bcrypt.genSaltSync(10), null),
      role: 'Registered',
      avatar: 'default_user.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // Users data faker
    await queryInterface.bulkInsert('Users', users, {}); 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
