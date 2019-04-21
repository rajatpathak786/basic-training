'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('moduleTables', 'taskId')
    .then(function() {
      queryInterface.addColumn('moduleTables', 'taskId', {
        type: Sequelize.INTEGER,
        references: {model: 'taskTables', key: 'id'}
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('moduleTables', 'taskId', {
      type: Sequelize.STRING
    })
    .then(function() {
      queryInterface.removeColumn('moduleTables', 'taskId')
    })
  }
};
