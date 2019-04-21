'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.DOUBLE
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};