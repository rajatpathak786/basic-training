const moduletable = require('../models').moduleTable;
const tasktable = require('../models').taskTable;
let moduleGet = (req, res) => {
  res.send('Post Json in format: \n modulename:\n taskId:');
  res.end();    
}
let moduleTaskMatchGet = (req, res) => {
  res.send('Post Json in format: \n moduleId: \n taskId:')
  res.end();
}
let moduleTaskMatchPost = (req, res) => {
  
}
let moduleInsert = (req, res) => {
  let obj = req.body;
  moduletable.create({
    moduleName: obj.modulename,
    //taskId: obj.taskId
  }/*, {
    include: [{
      model: taskTable,
      as : 'taskId' 
    }]
  }*/)
  .then(() => console.log('module details successfully inserted in moduletable'));  
  res.send(obj);
  res.end();
}
module.exports = {
  moduleGet,
  moduleInsert,
  moduleTaskMatchGet,
  moduleTaskMatchPost
}