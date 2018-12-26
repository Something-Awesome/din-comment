import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentGroup from "./commentGroup.jsx";
import $ from "jquery";
import "faker/locale/en_US";

//TODO: clean up input text box after submit
//TODO: add in css
//TODO: add in different views for different roles
//TODO: Fix bug in avator comment + reply

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          commentId: 1,
          comment: "first comment",
          user: "Dean",
          createdAt: "2018-11-25",
          replies: [
            {
              commentId: 1,
              replyId: 1,
              reply: "first reply",
              user: "Dean",
              createdAt: "2018-12-23"
            }
          ]
        },
        {
          commentId: 2,
          comment: "second comment",
          user: "Vincent",
          createdAt: "2018-12-25",
          replies: []
        }
      ],

      inputValue: "",
      currentUser: faker.internet.userName(),
      currentUserAvator: faker.internet.avatar(),
      // role: "loginUser",

      // reply related states
      replied: false,
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
    // popup alert to select user
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
    // This might not be needed
    // console.log("handleReply>>> ", this.props);
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
    // ajax to db
    // get comment ID
    // push to reply array
    event.preventDefault();
    // console.log("handleReplySubmit>>> ", this.props);
    console.log(`submitted reply for comment ${this.state.clickedCommentId}`);
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
          replyMessage: ""
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
