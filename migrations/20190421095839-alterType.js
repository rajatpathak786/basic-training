'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.addColumn('moduleTables', 'taskId', {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('moduleTables', 'taskId')
    }
  };
