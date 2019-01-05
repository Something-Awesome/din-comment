import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentGroup from "./commentGroup.jsx";
import $ from "jquery";
import "faker/locale/en_US";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],

      inputValue: "",
      currentUser: faker.internet.userName(),
      currentUserAvator: faker.internet.avatar(),

      // reply related states
      replied: false, // use to control when to expand reply box
      replyId: "",
      replyMessage: "",
      clickedCommentId: ""
    };
    // comments
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // replies
    this.handleReply = this.handleReply.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments() {
    $.ajax({
      method: "GET",
      url: "/comment",
      success: data => {
        console.log("AJAX success", data);
        this.setState({
          comments: data
        });
      },
      error: err => {
        console.log("AJAX failed", err);
      }
    });
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit() {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/comment",
      data: {
        comment: this.state.inputValue,
        user: this.state.currentUser,
        avatar: this.state.currentUserAvator
      },
      success: data => {
        console.log("AJAX success", data);
        this.loadComments();
        this.setState({
          inputValue: ""
        });
        event.preventDefault();
      },
      error: err => {
        console.log("AJAX failed", err);
      }
    });
  }

  handleReply(e) {
    event.preventDefault();
    const clickedCommentId = e.target.parentNode.className.substring(8);
    this.setState({
      replied: !this.state.replied,
      clickedCommentId: clickedCommentId
    });
  }

  handleReplyChange(e) {
    this.setState({
      replyMessage: e.target.value
    });
  }

  handleReplySubmit(e) {
    event.preventDefault();
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/reply",
      data: {
        commentId: this.state.clickedCommentId,
        reply: this.state.replyMessage,
        user: this.state.currentUser,
        avatar: this.state.currentUserAvator
      },
      success: data => {
        console.log("AJAX REPLY success", data);
        this.setState({
          replied: !this.state.replied,
          replyMessage: "",
          replyId: data
        });
        this.loadComments();
      },
      error: err => {
        console.log("AJAX REPLY failed", err);
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        <form>
          <textarea
            className="inputCommentBox"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
        <span>
          <button
            onClick={this.handleSubmit}
            id="submitButton"
            className="btn btn-link btn-lg"
          >
            Submit
          </button>
        </span>
        <CommentGroup
          comments={this.state.comments}
          currentUser={this.state.currentUser}
          currentUserAvator={this.state.currentUserAvator}
          replied={this.state.replied}
          replyId={this.state.replyId}
          replyMessage={this.state.replyMessage}
          clickedCommentId={this.state.clickedCommentId}
          handleReply={this.handleReply}
          handleReplyChange={this.handleReplyChange}
          handleReplySubmit={this.handleReplySubmit}
        />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
