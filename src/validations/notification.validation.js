const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getNotifications = {
  query: Joi.object().keys({
    receiver: Joi.string().custom(objectId).required(),
    notificationType: Joi.string(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

module.exports = { getNotifications };
