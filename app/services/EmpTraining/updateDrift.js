const emptrainingtable = require('../../../models/emptraingtable').empTraingTable;
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class UpdateDrift extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
        emptrainingtable.findAll ({
            attributes: ['id', 'dateOfStart', 'expectedDateOfCompletion'],
            where: {moduleId: this.variable.moduleId, taskId: this.variable.taskId}
          })
          .then(async (drift) => {
            emptrainingtable.update (
              {drift: this.variable.drift},
              {where: {id: drift[0].id}}
            )
            .then(async (expDate) => {
              let dateDrift = parseInt(this.variable.drift);
              this.variable.Date = drift[0].dateOfStart;
              this.variable.endDate = drift[0].expectedDateOfCompletion;
              for(let i = 0; i < (parseInt(this.variable.remTasks) + 1); i++) {
                if (i != 0) {
                  this.variable.Date = await new Date(this.variable.Date.setDate(this.variable.endDate.getDate()));
                  this.variable.endDate = await new Date(this.variable.endDate.setDate((this.variable.endDate.getDate() + 5)));
                  this.variable.id = await this.variable.id + 1;
                } else {
                  this.variable.endDate = await new Date(this.variable.endDate.setDate((this.variable.endDate.getDate() + dateDrift)));
                  this.variable.id = await drift[0].id;
                }
                await emptrainingtable.update (
                  {dateOfStart: this.variable.Date, expectedDateOfCompletion: this.variable.endDate},
                  {where: {id: this.variable.id}}
                )
              }
            })
          })
    return this.variable
    } catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}