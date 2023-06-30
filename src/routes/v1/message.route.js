const express = require('express');
const auth = require('../../middlewares/auth');
const messageValidation = require('../../validations/message.validation');
const { validate } = require('../../models/token.model');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMessages'), validate(messageValidation.createMessage))
  .get(auth('manageMessages'), validate(messageValidation.getMessages));

router
  .route('/:messageId')
  .get(auth('manageMessages'), validate(messageValidation.getMessage))
  .patch(auth('manageMessages'), validate(messageValidation.updateMessage))
  .delete(auth('manageMessages'), validate(messageValidation.deleteMessage));

router.route('/like/:messageId').patch(auth('manageMessages'), validate(messageValidation.likeMessage));

module.exports = router;
