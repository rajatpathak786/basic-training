const emptrainingtable = require('../../models').empTraingTable;
const emptable = require('../../models').empTable;
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
        where: {
          moduleName: req.body.modulename
        }
      })
        .then((modulee) => {
          emptable.findAll({
            attributes: ['id'],
            where: {
              empName: req.body.empname
            }
          })
            .then((emp) => {
              tasktable.findAll({
                attributes: ['taskName'],
                where: {
                  id: req.body.taskId
                }
              })
                .then((card) => {
                  let options = {
                    method: 'POST',
                    url: 'https://api.trello.com/1/cards',
                    qs:
                    {
                      name: card[0].taskName,
                      idList: listId,
                      keepFromSource: 'all',
                      key: apiKey,
                      token: token
                    }
                  };
                  request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                    emptrainingtable.update(
                      { cardId: body.id },
                      {
                        where: {
                          empId: emp[0].id,
                          moduleId: modulee[0].moduleId
                        }
                      }//empId: trello[0].id moduleId:trello[0].moduleId// empId: trello[0].id moduleId:trello[0].moduleId 
                    )
                  });
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
