'use strict';
module.exports = (sequelize, DataTypes) => {
  const empTraingTable = sequelize.define('empTraingTable', {
    empId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER,
    dateOfStart: DataTypes.DATE,
    dateOfCompletion: DataTypes.DATE,
    moduleId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    taskStatus: DataTypes.STRING,
    drift: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    body: DataTypes.STRING,
    leave: DataTypes.INTEGER,
    expectedDateOfCompletion: DataTypes.DATE
  }, {});
  empTraingTable.associate = function(models) {
    // associations can be defined here
  };
  return empTraingTable;
};