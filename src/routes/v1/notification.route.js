const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const notificationValidation = require('../../validations/notification.validation');
const notificationController = require('../../controllers/notification.controller');

const router = express.Router();

router
  .route('/')
  .get(
    auth('receiveNotification'),
    validate(notificationValidation.getNotifications),
    notificationController.getNotifications
  );

module.exports = router;
