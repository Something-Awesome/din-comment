const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const uuid = require('uuid');


let storage = [{
    commentId: 1,
    comment: "first comment",
    user: "Dean",
    replies: []
  },
  {
    commentId: 2,
    comment: "second comment",
    user: "Vincent",
    replies: []
  }
]; // TODO: replace with DB

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.post('/comment', (req, res) => {
  const newComment = {};
  console.log('req.body', req.body);
  newComment['commentId'] = uuid();
  newComment['user'] = req.body.user;
  newComment['comment'] = req.body.comment;
  newComment['replies'] = [];

  console.log('newComment', newComment);
  storage.push(newComment);
  res.status(201).end();
});

app.post('/reply', (req, res) => {
  const newReply = {};
  console.log('req.body', req.body);
  newReply['replyId'] = uuid();
  newReply['user'] = req.body.user;
  newReply['reply'] = req.body.reply;

  storage.forEach((commentStorage) => {
    if (JSON.stringify(commentStorage.commentId) === req.body.commentId) {
      console.log('Matched storage')
      commentStorage.replies.push(newReply);
    }
  });
  // console.log('storage', storage)
  // console.log('storage pushed element', storage[1]['replies'])
  res.status(201).end();
});

app.get('/comment', (req, res) => {
  res.send(storage);
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});