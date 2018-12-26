const db = require('../db/db');
const faker = require('faker');
const uuid = require('uuid');

faker.locale = "en_US";

const seedComment = (numTimes) => {
  faker.seed(123);
  for (let i = 0; i < numTimes; i++) {
    db.CommentModel.create({
      commentId: uuid(),
      comment: faker.lorem.sentence(),
      user: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      createdAt: faker.date.past(1),
      replies: []
    }, (err, data) => {
      if (err) {
        console.log('db error .>>', err)
      }
    });
  }
}

const seedCommentWithReplies = (numTimes) => {
  faker.seed(124);
  for (let i = 0; i < numTimes; i++) {
    db.CommentModel.create({
      commentId: uuid(),
      comment: faker.lorem.sentence(),
      user: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      createdAt: faker.date.past(1),
      replies: [{
        replyId: uuid(),
        user: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        reply: faker.lorem.sentence(),
        createdAt: faker.date.past(1),
      }]
    }, (err, data) => {
      if (err) {
        console.log('db error .>>', err)
      }
    });
  }
}

seedComment(3);
seedCommentWithReplies(3)