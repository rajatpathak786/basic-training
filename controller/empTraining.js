const emptrainingtable = require('../models').empTraingTable;
let empTrainingGet = (req, res) => {
  res.send('Send Post in JSON format\neid:\nrid:\nmodulename:\ntaskname:\ntaskstatus:\ndrift:\nsubject:\nbody:\nleave:\nexpDOC:');
  res.end();    
}
let empTrainingInsert = (req, res) => {
  let ret = req.body;
  obj = toTraining(ret);
  emptrainingtable.create({
    empId: obj.eid,
    reviewerId: obj.rid,
    dateOfStart: Date.now(),
    moduleName: obj.modulename,
    taskName: obj.taskname,
    taskStatus: obj.taskstatus,
    drift: obj.drift,
    subject: obj.subject,
    body: obj.body,
    leave: obj.leave,
    expectedDateOfCompletion: obj.expDOC
  })
  .then(() => console.log('details successfully inserted in empTrainingTable'));
  res.send(ret);
  res.end();
}
module.exports = {
  empTrainingGet,
  empTrainingInsert
}