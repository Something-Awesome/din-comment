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
        commentId={reply.commentId} // undefined?
        reply={reply.reply}
        user={reply.user}
        replyId={index} // update to uuid?
        avatar={
          reply.avatar === undefined ? props.currentUserAvator : reply.avatar
        } // undefined?
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
          value={props.replyMessage}
          onChange={props.handleReplyChange}
        />
        <button
          onClick={props.handleReplySubmit}
          className="btn btn-secondary btn-sm"
        >
          Submit
        </button>
      </div>
    );
  } else {
    showReplyBox = null;
  }

  return (
    <div className={`comment-${comments.commentId}`}>
      <div>{comments.comment}</div>
      <img src={comments.avatar} className="avatar" />
      <span> {comments.user}</span>
      <div>{moment(comments.createdAt).fromNow()}</div>
      <button onClick={props.handleReply} className="btn btn-link btn-sm">
        Reply
      </button>
      {showReplyBox}
      {replies}
    </div>
  );
};

export default Comment;
