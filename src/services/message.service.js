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

// const updateMessageById = async (messageId, updateReq) => {
//   const message = await getMessageById(messageId);
//   if (!message) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'message not found');
//   }
//   if (updateReq == req.body) {
//   }
// };

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
  // updateMessageById,
  deleteMessageById,
};
