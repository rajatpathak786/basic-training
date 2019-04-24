'use strict';
module.exports = (sequelize, DataTypes) => {
  const taskTable = sequelize.define('taskTable', {
    taskName: DataTypes.STRING
  }, {});
  taskTable.associate = function(models) {
    taskTable.belongsTo(models.moduleTable, {
      foriegnKey : 'id'
    });
  };
  return taskTable;
};