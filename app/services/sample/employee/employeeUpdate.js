import ServiceBase from '../base'


const constraints = {
variable: {
  presence: { allowEmpty: false }
}
}

export default class SampleService extends ServiceBase {
get constraints () {
  return constraints
}

async run () {
  try {

    let employeeUpdate = (req, res) => {
      let obj = req.body;
      emptable.update(
        {empName: obj.name},
        {where: {id: obj.id}}
      )
      .then((emp) => res.status(200).send(emp))
      .catch((error) => { res.status(400).send(error); });
    }

    return this.variable

  } catch (error) {

    res.status(400).send(error); 
    
    return this.variable
  }
}
}
