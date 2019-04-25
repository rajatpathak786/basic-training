import ServiceBase from '../base'
const emptable = require('../models').empTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeFetchId extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      emptable.findAll({
        attributes: ['id'],
        where: {empName: this.variable.name}
      })
    return this.variable.name

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
