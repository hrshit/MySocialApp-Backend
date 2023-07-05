const Joi = require('joi');
const { objectId, msgLength } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    content: Joi.string().required().custom(msgLength),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    content: Joi.string(),
    role: Joi.string().optional(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

const getMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
};

const updateMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required().custom(msgLength),
  }),
};

const deleteMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
};

const likeMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
  likeMessage,
};
