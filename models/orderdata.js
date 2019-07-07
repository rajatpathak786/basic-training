'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderData = sequelize.define('orderData', {
    ordername: DataTypes.STRING,
    yourorder: DataTypes.STRING,
    invoice: DataTypes.STRING,
    tax: DataTypes.FLOAT,
    totalAmount: DataTypes.FLOAT
  }, {});
  orderData.associate = function(models) {
    // associations can be defined here
  };
  return orderData;
};