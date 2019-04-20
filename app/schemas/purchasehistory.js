'use strict';
module.exports = (sequelize, DataTypes) => {
  var PurchaseHistory = sequelize.define('PurchaseHistory', {
    cartId: DataTypes.INTEGER,
    total: DataTypes.DOUBLE
  }, {});
  PurchaseHistory.associate = function(models) {
    PurchaseHistory.belongsTo(models.Cart);
    PurchaseHistory.hasMany(models.PurchasedItem);
  };
  return PurchaseHistory;
};