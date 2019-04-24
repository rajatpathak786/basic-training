const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const employee = require('./router/employee');
const modulee = require('./router/module');
const task = require('./router/task');
const empTraining = require('./router/emptraining');
const sendemail = require('./router/sendemail');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json());

router.use(sendemail);
router.use(employee);
router.use(modulee);
router.use(task);
router.use(empTraining);

module.exports = {router};