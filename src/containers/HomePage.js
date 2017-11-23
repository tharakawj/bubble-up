import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Topic from "../component/Topic";

import { getHomeTopics } from "../selectors";
import { upvoteTopic, downvoteTopic } from "../actions";
import { TOPICS_IN_HOMEPAGE } from "../constants/appConstants";

const HomePage = props => {
  const { topics, loading } = props;
  return (
    <div className="home">
      <div className="topic-header">
        <div className="pull-right">
          <Link to="/new" className="btn btn-primary">
            New Post
          </Link>
        </div>
        <h2>
          <span className="glyphicon glyphicon-fire" />Trending
        </h2>
      </div>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            <Topic
              topic={topic}
              onUpvote={props.upvoteTopic}
              onDownvote={props.downvoteTopic}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    topics: getHomeTopics(state, TOPICS_IN_HOMEPAGE),
    loading: state.topics.loading,
    error: state.topics.error
  };
}

export default connect(mapStateToProps, { upvoteTopic, downvoteTopic })(
  HomePage
);
