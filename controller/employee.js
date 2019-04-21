const emptable = require('../models').empTable;
let employeeInsert = (req,res) => {
  let ret = req.body;
   emptable.create({
    empName: ret.name,
    empEmail: ret.email
  })
  .then(() => console.log('employee details successfully inserted in emptable'));
  res.send(ret);
  res.end();    
}
let employeeFetch = (req, res) => {
  let ret = req.body;
  emptable.findAll({
    include: [{
      model: emptable,
    }],
  })
  .then((emp) => res.status(200).send(emp))
  .catch((error) => { res.status(400).send(error); });
}
let employeeGet = (req,res) => {
  res.send('send post request in json format\n name: \nemail:');
  res.end();
}
module.exports = {
  employeeInsert,
  employeeGet,
  employeeFetch
}




/*add(req, res) {
  return Role
    .create({
      role_name: req.body.role_name,
    })
    .then((role) => res.status(201).send(role))
    .catch((error) => res.status(400).send(error));
},

addUser(req, res) {
  return Role
    .findById(req.body.role_id, {
      include: [{
        model: User,
        as: 'users'
      }],
    })
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          message: 'Role Not Found',
        });
      }
      User.findById(req.body.role_id).then((course) => {
        if (!course) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        role.addUser(course);
        return res.status(200).send(role);
      })
    })
    .catch((error) => res.status(400).send(error));
}*/