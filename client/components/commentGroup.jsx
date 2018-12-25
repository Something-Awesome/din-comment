import React from "react";
import Comment from "./comment.jsx";

// this.state = {
//   comments: [
//     { commentId: 1, comment: "first comment", user: "Dean", replies: {} }
//   ],

const CommentGroup = props => {
  const comments = props.comments;
  let formatComments = comments.map((element, index) => {
    return (
      <li key={index}>
        <Comment comment={element} />
      </li>
    );
  });
  // console.log(formatComments);
  // console.log(comment);
  return <ul>{formatComments}</ul>;
};

export default CommentGroup;
