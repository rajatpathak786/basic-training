const tasktable = require('../models').taskTable;
let taskGet = (req, res) => {
  res.send('send json in format\n taskname:');
  res.end();    
}
let taskInsert = (req, res) => {
  let obj = req.body;
  tasktable.create({
    taskName: obj.taskname
  })
  .then(() => console.log('module details successfully inserted in tasktable'));
  res.send(obj);
  res.end();
}
module.exports = {
  taskGet,
  taskInsert
}