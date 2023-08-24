const { Notification } = require('../models');

const getNotifications = async (filter, options) => {
  const notifications = await Notification.paginate(filter, options);
  return notifications;
};

module.exports = {
  getNotifications,
};
