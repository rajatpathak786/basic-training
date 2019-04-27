const express = require('express');
const router = express.Router();
import task from '../../app/controllers/task'

router.get('/task', task.taskGet);
router.post('/task', task.taskInsert);
router.get('/taskFetch', task.taskFetch);
router.get('/taskFetchId', task.taskFetchId);
router.get('/taskDelete', task.taskDelete);
router.post('/taskUpdate', task.taskUpdate);

module.exports = router;