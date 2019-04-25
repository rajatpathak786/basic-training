import ServiceBase from '../base'
const tasktable = require('../models').taskTable;
const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class TaskInsert extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      tasktable.create({
        taskName: this.variable.taskname
      })
      .then(() => console.log('module details successfully inserted in tasktable'));
      return this.variable

    } catch (error) {
      return this.variable
    }
  }
}
