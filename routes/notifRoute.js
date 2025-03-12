const express = require('express');
const router = express.Router();
const { sendEmail, sendSMS, sendPushNotification } = require('../controllers/notifController');

router.post('/sendEmail', sendEmail); 
router.post('/sendSMS', sendSMS);
router.post('/sendNotification', sendPushNotification);

module.exports = router;
