const mongoose = require('mongoose');
const { notificationTypes } = require('../config/notificationType');
const { toJSON, paginate } = require('./plugins');

const notificationSchema = mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notificationType: {
    type: String,
    enum: notificationTypes,
    required: true,
  },
  referencePost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

const Notification = mongoose.model('Notfication', notificationSchema);
module.exports = Notification;
