import ServiceBase from '../base'


const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class employeeGet extends ServiceBase {
  
  get constraints () {
    return constraints
  }

  async run () {
    console.log('employeeGet')
    console.dir(this._errors)
    console.dir(this._args);
    try {
      console.log(__filename+"   "+this.variable);
      return this._args

    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
