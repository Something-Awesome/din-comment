import React from "react";
import Comment from "./comment.jsx";

const CommentGroup = props => {
  console.log("props in comment group", props);
  let formatComments = props.comments.map((element, index) => {
    return (
      <li key={index} className="list-group-item">
        <Comment
          comment={element}
          currentUser={props.currentUser}
          currentUserAvator={props.currentUserAvator}
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
  return <ul className="list-group">{formatComments}</ul>;
};

export default CommentGroup;
