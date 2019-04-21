'use strict';
module.exports = (sequelize, DataTypes) => {
  const moduleTable = sequelize.define('moduleTable', {
    moduleName: DataTypes.STRING,
    taskId: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  moduleTable.associate = function(models) {
    // associations can be defined here
    moduleTable.hasMany(models.taskTable, {
      foriegnKey : 'id',
      as : 'tasktable'
    });
  };
  return moduleTable;
};