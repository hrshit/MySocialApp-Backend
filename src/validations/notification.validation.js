const Joi = require('joi');

const getNotifications = {
  query: Joi.object().keys({
    notificationType: Joi.string(),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

module.exports = { getNotifications };
