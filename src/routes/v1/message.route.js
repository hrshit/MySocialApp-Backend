const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const messageValidation = require('../../validations/message.validation');
const messageController = require('../../controllers/message.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMessages'), validate(messageValidation.createMessage), messageController.createMessage)
  .get(auth('manageMessages'), validate(messageValidation.getMessages), messageController.getMessages);

router
  .route('/:messageId')
  .get(auth('manageMessages'), validate(messageValidation.getMessage), messageController.getMessage)
  .patch(auth('manageMessages'), validate(messageValidation.updateMessage), messageController.updateMessage)
  .delete(auth('manageMessages'), validate(messageValidation.deleteMessage), messageController.deleteMessage);

router
  .route('/like/:messageId')
  .patch(auth('manageMessages'), validate(messageValidation.likeMessage), messageController.likeMessage);

module.exports = router;
