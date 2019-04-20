'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    author: DataTypes.STRING,
    country: DataTypes.STRING,
    language: DataTypes.STRING,
    link: DataTypes.STRING,
    page: DataTypes.STRING,
    title: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    unitPrice: DataTypes.DOUBLE,
    version: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Cart);
    Product.hasMany(models.PurchasedItem);
  };
  return Product;
};