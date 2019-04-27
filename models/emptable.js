'use strict';
const sequelize = require('../server/sequelize');
module.exports = (sequelize, DataTypes) => {
  console.log()
  const empTable = sequelize.define('empTable', {
    empName: DataTypes.STRING,
    empEmail: DataTypes.STRING
  }, {});
  empTable.associate = function(models) {
    // associations can be defined here
  };
  return empTable;
};