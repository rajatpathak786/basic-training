import ServiceBase from '../base'
const moduletable = require('../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class ModuleUpdate extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      moduletable.update({ taskId: this.variable.taskId }, {
        where: {
          id: this.variable.id
        }
      })
      return this.variable
    } catch (error) {
      return this.variable
    }
  }
}
