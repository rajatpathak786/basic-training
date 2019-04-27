const express = require('express');
const router = express.Router();
import empTraining from '../../app/controllers/empTraining'

router.get('/training', empTraining.empTrainingGet);
router.post('/training', empTraining.empTrainingInsert);
router.get('/trelloBoard', empTraining.trelloUpdateBoard);
router.get('/updateDrift', empTraining.updateDriftParams);
router.post('/updateDrift', empTraining.updateDrift);

module.exports = router;