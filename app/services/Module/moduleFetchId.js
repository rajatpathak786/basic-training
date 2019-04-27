import ServiceBase from '../base'
const moduletable = require('../../../models/moduletable').moduleTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class ModuleFetchId extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      moduletable.findAll({
        attributes: ['id'],
        where: {moduleName: this.variable.name}
      })
      return this.variable
    } catch (error) {   
      return this.variable
    }
  }
}
