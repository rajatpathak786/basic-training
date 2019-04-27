import ServiceBase from '../base'
const emptable = require('../../../models/emptable').empTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeUpdate extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      emptable.update(
        { empName: this.variable.name },
        { where: { id: this.variable.id } }
      )
      return this.variable
    } catch (error) {

      // handle error case

      return this.variable
    }
  }
}
