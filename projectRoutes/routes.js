const employee = require('../controller/employee');
const submit = require('../controller/submit');
const modulee = require('../controller/module');
const task = require('../controller/task');
const empTraining = require('../controller/empTraining');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json());
router.get('/employee', employee.employeeGet);
router.post('/employee', employee.employeeInsert);
router.get('/employeeFetch', employee.employeeFetch);
router.get('/module', modulee.moduleGet);
router.post('/module', modulee.moduleInsert);
//router.get('/module', modulee.moduleTaskMatchGet);
//router.post('/module', modulee.moduleTaskMatchPost);
router.get('/task', task.taskGet);
router.post('/task', task.taskInsert);
router.get('/training', empTraining.empTrainingGet);
router.post('/training', empTraining.empTrainingInsert);
router.get('/submit', submit.submitGet);
router.post('/submit', submit.submitUpdate);

module.exports = router;