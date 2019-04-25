import ServiceBase from '../base'
const moduletable = require('../models').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class ModuleDelete extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
        moduletable.destroy({
            where: {moduleName: this.variable.name}
          })
      return this.variable
    } catch (error) {     
      return this.variable
    }
  }
}
