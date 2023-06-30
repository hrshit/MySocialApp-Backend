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
  likes: {
    likedby: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

// messageSchema.methods.isAlready(userid);
// {
//   return this.likes.likedby.includes(userid);
// }

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
