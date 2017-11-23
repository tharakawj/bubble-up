import React from "react";
import VoteControl from "./VoteControl";

const Topic = ({ topic, onUpvote, onDownvote }) => (
  <div className="topic">
    <VoteControl
      votes={topic.upvotes}
      onUpvote={onUpvote.bind(null, topic.id)}
      onDownvote={onDownvote.bind(null, topic.id)}
    />
    <p>{topic.text}</p>
    <div className="clearleft" />
  </div>
);

export default Topic;
