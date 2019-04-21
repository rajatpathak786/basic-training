const moduletable = require('../models').moduleTable;
let moduleGet = (req, res) => {
  res.send('Post Json in format: \n modulename:\n taskId:');
  res.end();    
}
let moduleFetch = (req, res) => {
  res.send('Post Json in format: \nmodulename:');
  res.end();
}
let moduleFetchId = (req, res) => {
  moduletable.findAll({
    attributes: ['id'],
    where: {moduleName: req.query.name}
  })
  .then((modulee) => res.status(200).send(modulee))
  .catch((error) => { res.status(400).send(error); });
}
let moduleInsert = (req, res) => {
  let obj = req.body;
  moduletable.create({
    moduleName: obj.modulename,
    taskId: obj.taskId
  })
  .then(() => console.log('module details successfully inserted in moduletable'));  
  res.send(obj);
  res.end();
}
let moduleUpdate = (req, res) => {
  moduletable.update({taskId: req.body.taskId},{
    where:{
      id:req.body.id
    }
  })
  .then((modulee) => res.status(200).send(modulee))
  .catch((error) => { res.status(400).send(error); })
}
let moduleDelete = (req, res) => {
  moduletable.destroy({
    where: {moduleName: req.body.name}
  })
  .then(() => res.status(204).send())
  .catch((error) => res.status(400).send(error));
}
module.exports = {
  moduleGet,
  moduleInsert,
  moduleFetch,
  moduleFetchId,
  moduleDelete,
  moduleUpdate
}