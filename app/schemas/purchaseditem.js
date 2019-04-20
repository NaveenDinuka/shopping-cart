'use strict';
module.exports = (sequelize, DataTypes) => {
  var PurchasedItem = sequelize.define('PurchasedItem', {
    purchaseHistoryId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    version: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.DOUBLE,
  }, {});
  PurchasedItem.associate = function(models) {
    PurchasedItem.belongsTo(models.PurchaseHistory);
    PurchasedItem.belongsTo(models.Product);
  };
  return PurchasedItem;
};