import React from "react";
import Comment from "./comment.jsx";

// this.state = {
//   comments: [
//     { commentId: 1, comment: "first comment", user: "Dean", replies: {} }
//   ],

const CommentGroup = props => {
  // const comments = props.comments;
  // const currentUser = props.currentUser;
  console.log("props in comment group", props);
  let formatComments = props.comments.map((element, index) => {
    return (
      <li key={index} className="list-group-item">
        <Comment
          comment={element}
          currentUser={props.currentUser}
          handleReply={props.handleReply}
          handleReplyChange={props.handleReplyChange}
          handleReplySubmit={props.handleReplySubmit}
          replied={props.replied}
          replyMessage={props.replyMessage}
          clickedCommentId={props.clickedCommentId}
        />
      </li>
    );
  });
  // console.log(formatComments);
  // console.log(comment);
  return <ul className="list-group">{formatComments}</ul>;
};

export default CommentGroup;
