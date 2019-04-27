const express = require('express');
const router = express.Router();
import employee from '../../app/controllers/employee'

router.get('/employee', employee.employeeGet);
router.post('/employee', employee.employeeInsert);
router.get('/employeeFetch', employee.employeeFetch);
router.get('/employeeFetchId', employee.employeeFetchId);
router.post('/employeeUpdate', employee.employeeUpdate);
router.get('/employeeDelete', employee.employeeDelete);

module.exports = router;