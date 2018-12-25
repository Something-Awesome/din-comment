import React, { Component } from "react";
import ReactDOM from "react-dom";
import CommentGroup from "./commentGroup.jsx";

// import { Media } from 'react-bootstrap';
import $ from "jquery";

// {comments: 'first comment', user:'Dean', replies:{{comments: 'first reply', user:'Vincent', replies:{}}}}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        { commentId: 1, comment: "first comment", user: "Dean", replies: {} },
        {
          commentId: 2,
          comment: "second comment",
          user: "Vincent",
          replies: {}
        }
      ],
      inputValue: "",
      currentUser: "Dean"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // popup alert to select user
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
      data: { comment: this.state.inputValue, user: this.state.currentUser },
      success: data => {
        console.log("AJAX success", data);
        this.loadComments();
        event.preventDefault();
      },
      error: err => {
        console.log("AJAX failed", err);
      }
    });
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

  render() {
    return (
      <div>
        <form className="wrapper">
          <textarea
            className="inputCommentBox"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
        <span>
          <button onClick={this.handleSubmit} className="submitButton">
            Submit
          </button>
        </span>
        <CommentGroup comments={this.state.comments} />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
