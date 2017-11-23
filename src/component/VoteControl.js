import React from "react";

const VoteControl = ({ votes, onUpvote, onDownvote }) => (
  <div className="vote-control">
    <button className="btn btn-default btn-xs" onClick={onUpvote}>
      <span className="glyphicon glyphicon-chevron-up" />
    </button>
    <div>{votes}</div>
    <button className="btn btn-default btn-xs" onClick={onDownvote}>
      <span className="glyphicon glyphicon-chevron-down" />
    </button>
  </div>
);

export default VoteControl;
