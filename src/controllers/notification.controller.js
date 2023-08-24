const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');

const getNotifications = catchAsync(async (req, res) => {
  req.query.receiver = req.user;
  const filter = pick(req.query, ['notificationType', 'receiver']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await notificationService.getNotifications(filter, options);
  res.send(result);
});

module.exports = {
  getNotifications,
};
