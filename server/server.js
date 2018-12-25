const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let storage = [
  [{
    comment: "first comment",
    user: "Dean",
    replies: {}
  }]
]; // TODO: replace with DB

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.post('/comment', (req, res) => {
  storage.push([req.body.data]);
  res.status(201).end();
});

app.get('/comment', (req, res) => {
  console.log('req.. ', req);
  console.log('STORAGE.. ', storage);
  res.send(storage);
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});