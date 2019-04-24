const express = require('express');
const router = express.Router();
const sendemail = require('../../controller/sendemail');

router.get('/email', sendemail.sendEmailParams);
router.post('/email', sendemail.sendEmail);

module.exports = {router};