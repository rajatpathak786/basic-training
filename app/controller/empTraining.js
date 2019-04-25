const emptrainingtable = require('../../models').empTraingTable;
const moduletable = require('../../models').moduleTable;
const emptable = require('../../models').empTable;
const tasktable = require('../../models').taskTable;
const request = require("request");
const {apiKey, token} = require('./config.js');
let empTrainingGet = (req, res) => {
  res.send('Send Post in JSON format\neid:\nrid:\nmodulename:\ntaskstatus:');
  res.end();    
}
let empTrainingInsert = (req, res) => {
  let obj = req.body;
  obj.date=new Date();
  obj.endDate = new Date();
  obj.endDate = new Date(obj.endDate.setDate(obj.date.getDate() + 5));
  moduletable.findAll({
    attributes: ['id'],
    where: {moduleName: obj.modulename}
  })
  .then((objmodule) => {
    moduletable.findAll( {
      attributes: ['taskId'],
      where: {moduleName: obj.modulename}
    })
    .then(async(objtaskId) => {
      let len = objtaskId[0].taskId.length
      console.log(len);
      for(let i=0; i < len; i++) {
        if(i != 0) { 
          obj.date = await new Date(obj.date.setDate(obj.date.getDate() + 5))
          obj.endDate = await new Date(obj.endDate.setDate(obj.endDate.getDate() + 5))
          console.log(obj.date+"      "+obj.endDate)
        }
        await emptrainingtable.create ({
          empId: obj.eid,
          reviewerId: obj.rid,
          //moduleName: obj.modulename,
          //taskName: obj.taskname,
          taskStatus: obj.taskstatus,
          drift: obj.drift,
          subject: obj.subject,
          body: obj.body,
          leave: obj.leave,
          dateOfStart: obj.date,
          expectedDateOfCompletion: obj.endDate,
          moduleId: objmodule[0].id,
          taskId:objtaskId[0].taskId[i]
        })
      }
    })
    .then(() => {
      console.log('emptrainingtable created');
      res.send('emptrainingtable created');
      res.end();
    })
  })
}
let trelloBoard = (req, res) => {
  emptable.findAll({
    attributes: ['id'],
    where: {empName: req.query.name}
  })
  .then((trello) => {
    let createBoard = (assignmentName) => {
    let options = { method: 'POST',
    url: 'https://api.trello.com/1/boards',
    qs: 
     { name: assignmentName,
       defaultLabels: 'true',
       defaultLists: 'true',
       keepFromSource: 'none',
       prefs_permissionLevel: 'private',
       prefs_voting: 'disabled',
       prefs_comments: 'members',
       prefs_invitations: 'members',
       prefs_selfJoin: 'true',
       prefs_cardCovers: 'true',
       prefs_background: 'blue',
       prefs_cardAging: 'regular', 
       key: apiKey,
       token: token
      } 
    };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    emptrainingtable.update (
    {boardId: body.id},
    {where: {empId: trello[0].id}}//empId: trello[0].id moduleId:trello[0].moduleId// empId: trello[0].id moduleId:trello[0].moduleId 
    )
  });
}
createBoard('Employee Training');
  })
}
let trelloCard = (req, res) => {
  moduletable.findAll ({
    attributes: ['id'],
    where: {
      moduleName: req.body.modulename
    }
  })
  .then((modulee) => {
    emptable.findAll ({
      attributes: ['id'],
      where: {
        empName: req.body.empname
      }
    })
    .then((emp) => {
      tasktable.findAll ({
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
          //cardId=body.id database code here.
          console.log(body);
          emptrainingtable.update (
            {cardId: body.id},
            {where: {
              empId: emp[0].id,
              moduleId: modulee[0].moduleId
            }}//empId: trello[0].id moduleId:trello[0].moduleId// empId: trello[0].id moduleId:trello[0].moduleId 
            )
        });
      })
    })
  })
  
}
let trelloList = (req, res) => {
  moduletable.findAll ({
    attributes: ['id'],
    where: {moduleName: req.body.modulename}
  })
  .then((modulee) => {
    emptable.findAll ({
      attributes: ['id'],
      where: {empName: req.body.empname}
    })
    .then((emp) => {
      tasktable.findAll ({
        attributes: ['id'],
        where: {taskName: req.body.taskname}
      })
      .then((task) => {
        emptrainingtable.findAll ({
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
            emptrainingtable.update (
              {listId: body.id},
              {where: {
                taskId: task[0].id,
                moduleId: modulee[0].id,
                empId: emp[0].id
              }}
            )
          })
        })
      })
    })
  })
}

let updateDrift = (req, res) => {
  let obj = req.body;
  obj.endDate = new Date();
  obj.Date = new Date();
  emptrainingtable.findAll ({
    attributes: ['id', 'dateOfStart', 'expectedDateOfCompletion'],
    where: {moduleId: obj.moduleId, taskId: obj.taskId}
  })
  .then(async (drift) => {
    emptrainingtable.update (
      {drift: obj.drift},
      {where: {id: drift[0].id}}
    )
    .then(async (expDate) => {
      let dateDrift = parseInt(obj.drift);
      obj.Date = drift[0].dateOfStart;
      obj.endDate = drift[0].expectedDateOfCompletion;
      for(let i = 0; i < (parseInt(obj.remTasks) + 1); i++) {
        if (i != 0) {
          obj.Date = await new Date(obj.Date.setDate(obj.endDate.getDate()));
          obj.endDate = await new Date(obj.endDate.setDate((obj.endDate.getDate() + 5)));
          obj.id = await obj.id + 1;
        } else {
          obj.endDate = await new Date(obj.endDate.setDate((obj.endDate.getDate() + dateDrift)));
          obj.id = await drift[0].id;
        }
        await emptrainingtable.update (
          {dateOfStart: obj.Date, expectedDateOfCompletion: obj.endDate},
          {where: {id: obj.id}}
        )
      }
    })
  })
  .then(() => {
    res.send('drift updated');
    res.end();
  })
}
let updateDriftParams = (req, res) => {
  res.send('Send Post in JSON format:\nmoduleId:\ntaskId:\ndrift:\nremTasks:');
  res.end();
}

module.exports = {
  empTrainingGet,
  empTrainingInsert,
  trelloBoard,
  trelloCard,
  trelloList,
  updateDrift,
  updateDriftParams
}