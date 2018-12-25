import React, { Component } from "react";
import Reply from "./reply.jsx";
import $ from "jquery";
// this.state = {
//   comments: [
//     { commentId: 1, comment: "first comment", user: "Dean", replies: {} }
//   ],

// when click submit => create a new comment object => ajax request
// when click reply => look up commentId

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replied: false,
      replyMessage: "",
      clickedCommentId: ""
    };
    console.log("props in comments", this.props);
    this.handleReply = this.handleReply.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
  }

  handleReply(e) {
    event.preventDefault();
    // This might not be needed
    const clickedCommentId = e.target.parentNode.className.substring(8);
    this.setState({
      replied: true,
      clickedCommentId: clickedCommentId
    });
  }

  handleReplyChange(e) {
    this.setState({
      replyMessage: e.target.value
    });
  }

  handleReplySubmit(e) {
    // ajax to db
    // get comment ID
    // push to reply array
    event.preventDefault();
    console.log(this.props);
    console.log(`submitted reply for comment ${this.props.comment.commentId}`);
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/reply",
      data: {
        commentId: this.props.comment.commentId,
        reply: this.state.replyMessage,
        user: this.props.currentUser
      },
      success: data => {
        console.log("AJAX REPLY success", data);
        this.setState({
          replied: false
        });
      },
      error: err => {
        console.log("AJAX REPLY failed", err);
      }
    });
  }

  render() {
    const comments = this.props.comment;
    let showReplyBox;

    const replies = this.props.comment.replies.map((reply, index) => {
      console.log("reply>>>", reply);
      // todo: replace index with replyID
      return (
        <Reply
          key={index}
          commentId={reply.commentId}
          reply={reply.reply}
          user={reply.user}
          replyId={index} // update to uuid? 
          currentUser={this.props.currentUser}
        />
      );
    });

    if (this.state.replied === true) {
      showReplyBox = (
        <div>
          <textarea
            className="replyBox"
            value={this.state.inputValue}
            onChange={this.handleReplyChange}
          />
          <button onClick={this.handleReplySubmit}>Submit</button>
        </div>
      );
    } else {
      showReplyBox = null;
    }

    return (
      <div className={`comment-${comments.commentId}`}>
        <div>{comments.comment}</div>
        <div>{comments.user}</div>
        <button onClick={this.handleReply}>Reply</button>
        {showReplyBox}
        {replies}
      </div>
    );
  }
}

export default Comment;
