import ServiceBase from '../base'


const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class SampleService extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    try {
      return this.variable
    } catch (error) {
      return this.variable
    }
  }
}
