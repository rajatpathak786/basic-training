const emptrainingtable = require('../models').empTraingTable;
const moduletable = require('../models').moduleTable;
import ServiceBase from '../base'

const constraints = {
  variable: {
    presence: { allowEmpty: false }
  }
}

export default class EmpTrainingInsert extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      moduletable.findAll({
        attributes: ['id'],
        where: {moduleName: this.variable.modulename}
    })
    .then((objmodule) => {
      moduletable.findAll( {
        attributes: ['taskId'],
        where: {moduleName: this.variable.modulename}
    })
    .then(async(objtaskId) => {
      let len = objtaskId[0].taskId.length
      console.log(len);
      for(let i=0; i < len; i++) {
        if(i != 0) { 
          this.variable.date = await new Date(this.variable.date.setDate(this.variable.date.getDate() + 5))
          this.variable.endDate = await new Date(this.variable.endDate.setDate(this.variable.endDate.getDate() + 5))
          console.log(this.variable.date+"      "+this.variable.endDate)
        }
        await emptrainingtable.create ({
          empId: this.variable.eid,
          reviewerId: this.variable.rid,
          taskStatus: this.variable.taskstatus,
          drift: this.variable.drift,
          subject: this.variable.subject,
          body: this.variable.body,
          leave: this.variable.leave,
          dateOfStart: this.variable.date,
          expectedDateOfCompletion: this.variable.endDate,
          moduleId: objmodule[0].id,
          taskId:objtaskId[0].taskId[i]
        })
      }
    })
    return this.variable
  })} catch (error) {

      // handle error case
      
      return this.variable
    }
  }
}
