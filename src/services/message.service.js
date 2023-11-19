const httpStatus = require('http-status');
const { Message, Notification } = require('../models');
const ApiError = require('../utils/ApiError');
const { notificationTypes } = require('../config/notificationType');

const createMessage = async (messagebody) => {
  return Message.create(messagebody);
};

const getMessages = async (filter, options) => {
  const messages = await Message.paginate(filter, options);
  return messages;
};

const getMessageById = async (messageId) => {
  return Message.findById(messageId);
};

const updateMessageById = async (messageId, updateReq, user) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'message not found');
  } else if (message.postedBy.id !== user.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'message not posted by you');
  }
  Object.assign(message, updateReq);
  await message.save();
  return message;
};

const likeMessageById = async (messageId, user) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'message not found');
  }

  const isLiked = await message.isUserAlreadyLiked(user);
  if (!isLiked) {
    await message.likes.push(user);
    const notificationBody = {
      receiver: message.postedBy,
      creator: user,
      notificationType: notificationTypes.like,
      referencePost: message,
    };

    // console.log("check point 1", notificationBody);
    await Notification.create(notificationBody);
    // const myNotification = await Notification.create(notificationBody);
    // console.log("check Point 2", myNotification);
  } else {
    await message.likes.pull(user);
  }

  message.save();
  return message;
};

const deleteMessageById = async (messageId) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  }
  await message.remove();
  return message;
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageById,
  likeMessageById,
  deleteMessageById,
};
