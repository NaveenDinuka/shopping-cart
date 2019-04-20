'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userVerificationToken: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Cart)
  };
  return User;
};