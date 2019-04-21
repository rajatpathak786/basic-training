const tasktable = require('../models').taskTable;
let taskGet = (req, res) => {
  res.send('send json in format\n taskname:');
  res.end();    
}
let taskFetch = (req, res) => {
  res.send('Post response in Json format\ntaskname:');
}
let taskFetchId = (req, res) => {
  tasktable.findAll({
    attributes: ['id'],
    where: {taskName: req.query.name}
  })
  .then((task) => res.status(200).send(task))
  .catch((error) => { res.status(400).send(error); });
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
let taskDelete = (req, res) => {
  tasktable.destroy({
    where: {taskName: req.body.name}
  })
  .then(() => res.status(204).send())
  .catch((error) => res.status(400).send(error));
}
let taskUpdate = (req, res) => {
  let obj = req.body;
  tasktable.update(
    {taskName: obj.name},
    {where: {id: obj.name}}
  )
  .then(() => res.status(204).send())
  .catch((error) => res.status(400).send(error));
}
module.exports = {
  taskGet,
  taskInsert,
  taskFetch,
  taskFetchId,
  taskDelete,
  taskUpdate
}