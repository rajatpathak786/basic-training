const emptable = require('../models').empTable;
let employeeInsert = (req,res) => {
  let obj = req.body;
  emptable.create({
    empName: obj.name,
    empEmail: obj.email
  })
  .then(() => console.log('employee details successfully inserted in emptable'));
  res.send(obj);
  res.end();    
}
let employeeFetch = (req, res) => {
  res.send('post data in Json format\nname:');
  res.end();
}
let employeeDelete = (req, res) => {
  console.log(req.query);
  emptable.destroy({
    where: {empName: req.query.name}
  })
  .then(() => res.status(204).send())
  .catch((error) => res.status(400).send(error));
}
let employeeFetchId = (req, res) => {
  console.dir(req);
  emptable.findAll({
    attributes: ['id'],
    where: {empName: req.query.name}
  })
  .then((emp) => res.status(200).send(emp))
  .catch((error) => { res.status(400).send(error); });
}
let employeeGet = (req,res) => {
  res.send('send post request in json format\n name: \nemail:');
  res.end();
}
let employeeUpdate = (req, res) => {
  let obj = req.body;
  emptable.update(
    {empName: obj.name},
    {where: {id: obj.id}}
  )
  .then((emp) => res.status(200).send(emp))
  .catch((error) => { res.status(400).send(error); });
}
module.exports = {
  employeeInsert,
  employeeDelete,
  employeeGet,
  employeeFetch,
  employeeFetchId,
  employeeUpdate
}




