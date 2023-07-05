const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'postedBy',
    select: ['name', 'email'],
  });
  this.populate([
    {
      path: 'likes',
      select: 'name',
    },
  ]);
  next();
});

messageSchema.methods.isUserAlreadyLiked = async function (user) {
  const isLiked = await this.likes.some(function (like) {
    return like.equals(user._id);
  });
  return isLiked;
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
