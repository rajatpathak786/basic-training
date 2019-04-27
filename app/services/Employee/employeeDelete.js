import ServiceBase from '../base'
const emptable = require('../../../models/emptable').empTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeDelete extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      emptable.destroy({
        where: { empName: this.variable.name }
      })
      return this.variable.name

    } catch (error) {

      // handle error case

      return this.variable
    }
  }
}
