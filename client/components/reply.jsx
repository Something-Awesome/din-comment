import React, { Component } from "react";
import moment from "moment";

const Reply = props => {
  console.log("props in reply component, ", props);
  return (
    <div className={`reply-${props.replyId}`}>
      <div>{props.reply}</div>
      <div>{props.user}</div>
      <div>{props.createdAt}</div>
    </div>
  );
};

export default Reply;
