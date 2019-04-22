'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Cart.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };
  return Cart;
};