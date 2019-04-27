const express = require('express');
const router = express.Router();
import modulee from '../../app/controllers/module'

router.get('/module', modulee.moduleGet);
router.post('/module', modulee.moduleInsert);
router.get('/moduleFetch', modulee.moduleFetch);
router.get('/moduleFetchId', modulee.moduleFetchId);
router.get('/moduleDelete', modulee.moduleDelete);
router.post('/moduleUpdate', modulee.moduleUpdate);

module.exports = router;