'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchasedItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      purchaseHistoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PurchaseHistories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      version: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('PurchasedItems');
  }
};