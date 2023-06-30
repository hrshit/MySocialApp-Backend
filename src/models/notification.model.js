const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    receivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  notificationType: {
    type: 'string',
    enum: ['TYPE1', 'TYPE2', 'TYPE3'],
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

const Notification = mongoose.model('Notfication', notificationSchema);
module.exports = Notification;
