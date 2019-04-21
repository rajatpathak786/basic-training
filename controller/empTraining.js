const emptrainingtable = require('../models').empTraingTable;
const moduletable = require('../models').moduleTable;
const emptable = require('../models').empTable;
let empTrainingGet = (req, res) => {
  res.send('Send Post in JSON format\neid:\nrid:\nmodulename:\ntaskname:\ntaskstatus:\ndrift:\nsubject:\nbody:\nleave:\nexpDOC:');
  res.end();    
}
let empTrainingInsert = (req, res) => {
  let obj = req.body;
  obj.date=new Date();
  obj.endDate=new Date();
  obj.endDate=new Date(obj.endDate.setDate(obj.date.getDate()+5));
  moduletable.findAll({
    attributes: ['id'],
    where: {moduleName: obj.modulename}
  })
  .then((objmodule) => {
    moduletable.findAll({
      attributes: ['taskId'],
      where: {moduleName: obj.modulename}
    }).then(async(objtaskId) => {
      let len=objtaskId[0].taskId.length
      for(let i=0;i<len;i++){
        if(i!=0)
        {obj.date=await new Date(obj.date.setDate(obj.date.getDate()+5))
        obj.endDate=await new Date(obj.endDate.setDate(obj.endDate.getDate()+5))
      console.log(obj.date+"      "+obj.endDate)}
        await emptrainingtable.create ({
          empId: obj.eid,
          reviewerId: obj.rid,
          moduleName: obj.modulename,
          taskName: obj.taskname,
          taskStatus: obj.taskstatus,
          drift: obj.drift,
          subject: obj.subject,
          body: obj.body,
          leave: obj.leave,
          dateOfStart: obj.date,
          expectedDateOfCompletion: obj.endDate,
          moduleId: objmodule[0].id,
          taskId:objtaskId[0].taskId[i]
      }).then(()=> {
        
      })
      }
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
       token: token} 
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
  emptrainingtable.findAll ({
    attributes: ['id'],
    where: {moduleId: req.body.moduleId, taskId: req.body.taskId}
  })
  .then((drift) => {
    console.dir(drift);
    emptrainingtable.update (
      {drift: req.body.drift},
      {where: {id: drift[0].id}}
    )
  })
}
let updateDriftParams = (req, res) => {
  res.send('Send Post in JSON format:\nmoduleId:\ntaskId:\ndrift:');
  res.end();
}

module.exports = {
  empTrainingGet,
  empTrainingInsert,
  trelloBoard,
  updateDrift,
  updateDriftParams
}