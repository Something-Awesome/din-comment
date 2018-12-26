const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/fec_database';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
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
  replies: [],
});

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports.CommentModel = CommentModel;