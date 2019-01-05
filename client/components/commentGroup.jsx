import React from "react";
import Comment from "./comment.jsx";

const CommentGroup = props => {
  console.log("props in comment group", props);
  let formatComments = props.comments.map((comment, index) => {
    return (
      <li key={comment.commentId} className="list-group-item">
        <Comment
          comment={comment}
          currentUser={props.currentUser}
          currentUserAvator={props.currentUserAvator}
          replied={props.replied}
          replyId={props.replyId}
          replyMessage={props.replyMessage}
          clickedCommentId={props.clickedCommentId}
          handleReply={props.handleReply}
          handleReplyChange={props.handleReplyChange}
          handleReplySubmit={props.handleReplySubmit}
        />
      </li>
    );
  });
  return <ul className="list-group">{formatComments}</ul>;
};

export default CommentGroup;
