import ServiceBase from '../base'
const tasktable = require('../models').taskTable;
const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class TaskFetchId extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      tasktable.findAll({
        attributes: ['id'],
        where: { taskName: this.variable.name }
      })
      return this.variable

    } catch (error) {
      return this.variable
    }
  }
}
