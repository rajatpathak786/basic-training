import ServiceBase from '../base'
const emptable = require('../../../models').empTable;
//import sequelize from '../../../server/sequelize'

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
      console.log(this._args.name);
      console.log('database');
      console.log(this._args.email);
      emptable.create({
        empName: this._args.name,
        empEmail: this._args.email
        })
        .then(() => console.log('employee details successfully inserted in emptable'));
      return this._args
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}

