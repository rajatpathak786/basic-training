import ServiceBase from '../base'
const moduletable = require('../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class ModuleInsert extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      moduletable.create({
        moduleName: this.variable.modulename,
        taskId: this.variable.taskId
      })
      return this.variable
    } catch (error) {
      return this.variable
    }
  }
}
