import React, { Component } from "react";
// this.state = {
//   comments: [
//     { commentId: 1, comment: "first comment", user: "Dean", replies: {} }
//   ],

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replied: false
    };
    this.handleReply = this.handleReply.bind(this);
  }

  handleReply() {
    event.preventDefault();
    this.setState({
      replied: true
    });
  }

  render() {
    const comments = this.props.comment;
    let showReplyBox;

    if (this.state.replied === true) {
      showReplyBox = (
        <div>
          <textarea
            className="inputCommentBox"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </div>
      );
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
