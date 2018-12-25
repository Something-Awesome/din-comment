import React, { Component } from "react";

// this.state = {
//   comments: [
//     { commentId: 1, comment: "first comment", user: "Dean", replies: {} }
//   ],

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replied: false,
      replyMessage: ""
    };
    this.handleReply = this.handleReply.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
  }

  handleReply() {
    event.preventDefault();
    this.setState({
      replied: true
    });
  }

  handleReplyChange(e) {
    this.setState({
      replyMessage: e.target.value
    });
  }

  handleReplySubmit(e) {
    //ajax to db
    event.preventDefault();
    console.log(this.props);
    console.log(`submitted reply for comment ${this.props.comment.commentId}`);
    this.setState({
      replied: false
    });
  }

  render() {
    const comments = this.props.comment;
    let showReplyBox;

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
      </div>
    );
  }
}

export default Comment;
