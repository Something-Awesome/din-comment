const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});