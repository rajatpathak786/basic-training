const emptrainingtable = require('../models').empTraingTable;
const moduletable = require('../models').moduleTable;
const emptable = require('../models').empTable;
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
    const {apiKey,token}=require('./config.js')
    var request = require("request");
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
    {where: {empId: trello.id}} 
    )
  });
}
createBoard('Employee Training');
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
  updateDrift,
  updateDriftParams
}