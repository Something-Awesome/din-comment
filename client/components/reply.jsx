import React, { Component } from "react";

const Reply = props => {
  console.log("reply propsssss", props);
  return (
    <div className={`reply-${props.replyId}`}>
      <div>{props.reply}</div>
      <div>{props.user}</div>
      <img src={props.avatar} className="avatar" />
      <div>{props.createdAt}</div>
    </div>
  );
};

export default Reply;
