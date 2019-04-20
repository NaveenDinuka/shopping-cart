'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
    Cart.hasMany(models.PurchaseHistory);
  };
  return Cart;
};