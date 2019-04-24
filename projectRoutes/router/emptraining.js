const express = require('express');
const router = express.Router();
const empTraining = require('../../controller/empTraining');

router.get('/training', empTraining.empTrainingGet);
router.post('/training', empTraining.empTrainingInsert);
router.get('/trelloBoard', empTraining.trelloBoard);
router.get('/updateDrift', empTraining.updateDriftParams);
router.post('/updateDrift', empTraining.updateDrift);

module.exports = {router};