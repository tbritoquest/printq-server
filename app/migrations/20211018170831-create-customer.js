'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false,
        notEmpty: true
      },
      address:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      isActive:{
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1

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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};