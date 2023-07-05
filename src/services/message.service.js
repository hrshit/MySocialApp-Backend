const httpStatus = require('http-status');
const { Message } = require('../models');
const ApiError = require('../utils/ApiError');

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

const updateMessageById = async (messageId, updateReq) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'message not found');
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
  } else {
    await message.likes.pull(user);
  }

  message.save();
  return message;
};

const deleteMessageById = async (messageId) => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
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
