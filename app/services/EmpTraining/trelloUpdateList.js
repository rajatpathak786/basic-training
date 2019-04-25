const emptrainingtable = require('../../../models').empTraingTable;
const emptable = require('../../../models').empTable;
const moduletable = require('../../../models').moduleTable;
const tasktable = require('../../../models').taskTable
const request = require("request");
const {apiKey, token} = require('./config');
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
      moduletable.findAll({
        attributes: ['id'],
        where: { moduleName: req.body.modulename }
      })
        .then((modulee) => {
          emptable.findAll({
            attributes: ['id'],
            where: { empName: req.body.empname }
          })
            .then((emp) => {
              tasktable.findAll({
                attributes: ['id'],
                where: { taskName: req.body.taskname }
              })
                .then((task) => {
                  emptrainingtable.findAll({
                    attributes: ['boardId'],
                    where: {
                      empId: emp[0].id,
                      taskId: task[0].id,
                      moduleId: modulee[0].id
                    }
                  })
                    .then((trellolist) => {
                      var options = {
                        method: 'POST',
                        url: `https://api.trello.com/1/boards/${trellolist[0].boardId}/lists`,
                        qs:
                        {
                          name: req.body.modulename,
                          pos: 'top',
                          key: apiKey,
                          token: token
                        }
                      };
                      var rq = request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        //listID=body.id database code here
                        emptrainingtable.update(
                          { listId: body.id },
                          {
                            where: {
                              taskId: task[0].id,
                              moduleId: modulee[0].id,
                              empId: emp[0].id
                            }
                          }
                        )
                      })
                    })
                })
            })
        })
      return this.variable

    } catch (error) {

      // handle error case

      return this.variable
    }
  }
}
