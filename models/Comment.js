const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: 'Um...you forgot to write something...',
      trim: true
    },
    writtenBy: {
      type: String,
      required: "It doesn't have to be your name...but you need to enter a name",
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
    required: "It doesn't have to be your name...but you need to enter a name",
    trim: true
  },
  commentBody: {
    type: String,
    required: 'Um...you forgot to write something...',
      trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  replies: [ReplySchema]
},
{
  toJSON: {
    getters: true,
    virtuals: true
  },
    id: false
});

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;