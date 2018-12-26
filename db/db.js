const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/fec_database';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  // we're connected!
  console.log('connected Database!')
});

const CommentSchema = new mongoose.Schema({
  commentId: String,
  comment: String,
  user: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [{
    commentId: String,
    replyId: String,
    reply: String,
    user: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
});

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports.CommentModel = CommentModel;