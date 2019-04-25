import ServiceBase from '../base'
const emptable = require('../models').empTable;

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeInsert extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      emptable.create({
        empName: this.variable.name,
        empEmail: this.variable.email
        })
        .then(() => console.log('employee details successfully inserted in emptable'));
      return this.variable
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}

