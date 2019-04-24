'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('empTraingTables', 'moduleId', {
      type: Sequelize.INTEGER,
      references: {model: 'moduleTables', key: 'id'}
    }).then(queryInterface.addColumn('empTraingTables', 'taskId', {
      type: Sequelize.INTEGER,
      references: {model: 'taskTables', key:'id'}
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('empTraingTables', 'moduleId').then(function() {
      queryInterface.removeColumn('empTraingTables', 'moduleId');
    })
  }
};
