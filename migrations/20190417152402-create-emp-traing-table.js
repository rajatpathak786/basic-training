'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('empTraingTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empId: {
        type: Sequelize.INTEGER,
        references:{model: 'empTables', key: 'id'},
        onDelete: 'cascade'
      },
      reviewerId: {
        type: Sequelize.INTEGER,
        references:{model: 'empTables', key: 'id'},
        onDelete: 'cascade'
      },
      dateOfStart: {
        type: Sequelize.DATE
      },
      dateOfCompletion: {
        type: Sequelize.DATE
      },
      moduleName: {
        type: Sequelize.STRING,
        references:{model: 'moduleTables', key: 'moduleName'},
        onDelete: 'cascade'
      },
      taskName: {
        type: Sequelize.STRING,
        references:{model: 'taskTables', key: 'taskName'},
        onDelete: 'cascade'
      },
      taskStatus: {
        type: Sequelize.STRING
      },
      drift: {
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      leave: {
        type: Sequelize.INTEGER
      },
      expectedDateOfCompletion: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('empTraingTables');
  }
};