import React, { Component } from "react";

const Reply = props => {
  console.log("props in reply component, ", props);
  return (
    <div className={`reply-${props.replyId}`}>
      <div>{props.reply}</div>
      <div>{props.user}</div>
    </div>
  );
};

export default Reply;
