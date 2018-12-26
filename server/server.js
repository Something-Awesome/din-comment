const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const uuid = require('uuid');
const moment = require('moment');
const db = require('../db/db');
const JSON = require('circular-json');

let storage = [{
    commentId: 1,
    comment: "first comment",
    user: "Dean",
    createdAt: "2016-12-25",
    replies: [{
      commentId: 1,
      replyId: 1,
      reply: "first reply",
      user: "Dean",
      createdAt: "2018-12-23"
    }]
  },
  {
    commentId: 2,
    comment: "second comment",
    user: "Vincent",
    createdAt: "2018-12-25",
    replies: []
  }
]; // TODO: replace with DB

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));


app.post('/comment', (req, res) => {
  // TODO: check if comment / reply is empty
  db.CommentModel.create({
    commentId: uuid(),
    comment: req.body.comment,
    user: req.body.user,
    createdAt: moment(),
    replies: []
  }, (err, data) => {
    if (err) {
      console.log('db error .>>', err)
      res.status(404).end();
    }
  });
  res.status(201).end();
});

app.post('/reply', (req, res) => {
  // TODO: check if comment / reply is empty
  const newReply = {};
  console.log('req.body', req.body);
  newReply['replyId'] = uuid();
  newReply['user'] = req.body.user;
  newReply['reply'] = req.body.reply;
  newReply['createdAt'] = moment();

  storage.forEach((commentStorage) => {
    if (JSON.stringify(commentStorage.commentId) === req.body.commentId ||
      commentStorage.commentId === req.body.commentId) {
      console.log('Matched storage')
      commentStorage.replies.push(newReply);
    }
  });

  res.status(201).end();
});


// Room.find({}).sort('-date').exec(function(err, docs) { ... });
app.get('/comment', (req, res) => {
  db.CommentModel.find({}).sort({
    'createdAt': 'desc'
  }).exec((err, data) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    console.log(data)
    res.send(data);
  })
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

