'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('moduleTables', 'taskId', {
      type: Sequelize.STRING,
      reference: {model: 'taskTables', key:'id'}
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('moduleTables', 'taskId')
  }
};
