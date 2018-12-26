import React from "react";
import Reply from "./reply.jsx";
import moment from "moment";

const Comment = props => {
  const comments = props.comment;
  let showReplyBox;

  const replies = props.comment.replies.map((reply, index) => {
    console.log("reply>>>", reply);
    // todo: replace index with replyID
    return (
      <Reply
        key={index}
        commentId={reply.commentId}
        reply={reply.reply}
        user={reply.user}
        replyId={index} // update to uuid?
        currentUser={props.currentUser}
        createdAt={moment(reply.createdAt).fromNow()}
      />
    );
  });

  if (
    (props.replied === true &&
      JSON.stringify(comments.commentId) === props.clickedCommentId) ||
    props.clickedCommentId === comments.commentId
  ) {
    showReplyBox = (
      <div>
        <textarea
          className="replyBox"
          value={props.inputValue}
          onChange={props.handleReplyChange}
        />
        <button onClick={props.handleReplySubmit}>Submit</button>
      </div>
    );
  } else {
    showReplyBox = null;
  }

  return (
    <div className={`comment-${comments.commentId}`}>
      <div>{comments.comment}</div>
      <div>{comments.user}</div>
      <div>{moment(comments.createdAt).fromNow()}</div>
      <button onClick={props.handleReply}>Reply</button>
      {showReplyBox}
      {replies}
    </div>
  );
};

export default Comment;
