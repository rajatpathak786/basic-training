'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('empTraingTables','boardId', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('empTraingTables','listId', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('empTraingTables','cardId', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('empTraingTables','boardId'),
      queryInterface.removeColumn('empTraingTables','listId'),
      queryInterface.removeColumn('empTraingTables','cardId')
    ])
  }
};
