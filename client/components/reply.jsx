import React, { Component } from "react";

const Reply = props => {
  return (
    <div className={`reply-${props.replyId}`}>
      <div>{props.reply}</div>
      <div>{props.user}</div>
      <div>{props.createdAt}</div>
    </div>
  );
};

export default Reply;
