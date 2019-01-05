const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const uuid = require('uuid');
const moment = require('moment');
const db = require('../db/db');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));


app.post('/comment', (req, res) => {
  if (req.body.comment === "") {
    res.status(400).send('please enter comment'); // bad request
  }

  db.CommentModel.create({
    commentId: uuid(),
    comment: req.body.comment,
    user: req.body.user,
    avatar: req.body.avatar,
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
  if (req.body.reply === "") {
    res.status(400).send('please enter reply'); // bad request
  }
  const newReply = {};
  newReply['replyId'] = uuid();
  newReply['user'] = req.body.user;
  newReply['reply'] = req.body.reply;
  newReply['avator'] = req.body.avatar;
  newReply['createdAt'] = moment();
  db.CommentModel.findOneAndUpdate({
      commentId: req.body.commentId
    }, {
      $push: {
        replies: {
          $each: [newReply],
          $position: 0
        }
      }
    },
    (err, data) => {
      if (err) {
        console.log('cannot find comment')
        res.status(404).end();
      }
      res.status(201).send(newReply['replyId']);
    })
});

app.get('/comment', (req, res) => {
  db.CommentModel.find({}).limit(10).sort({
    'createdAt': 'desc'
  }).exec((err, data) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    res.send(data);
  })
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});