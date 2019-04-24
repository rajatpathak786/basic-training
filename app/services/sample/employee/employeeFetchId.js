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

        let employeeFetchId = (req, res) => {
            console.dir(req);
            emptable.findAll({
              attributes: ['id'],
              where: {empName: req.query.name}
            })
            .then((emp) => res.status(200).send(emp))
            .catch((error) => { res.status(400).send(error); });
          }

      return this.variable

    } catch (error) {

        res.status(400).send(error)
      
      return this.variable
    }
  }
}
