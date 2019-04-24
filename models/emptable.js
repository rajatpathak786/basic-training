'use strict';
module.exports = (sequelize, DataTypes) => {
  const empTable = sequelize.define('empTable', {
    empName: DataTypes.STRING,
    empEmail: DataTypes.STRING
  }, {});
  empTable.associate = function(models) {
    // associations can be defined here
  };
  return empTable;
};