'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.removeColumn('empTraingTables', 'moduleName').then(function() {
      queryInterface.removeColumn('empTraingTables', 'taskName');
    })         
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('empTraingTables', 'moduleName').then(function() {
      queryInterface.addColumn('empTraingTables', 'taskName');
    })      
  }
};
