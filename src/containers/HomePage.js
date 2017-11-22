import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getHomeTopics } from "../selectors";
import { upvoteTopic, downvoteTopic } from "../actions";
import { TOPICS_IN_HOMEPAGE } from "../constants/appConstants";

const HomePage = props => {
  const { topics, loading } = props;
  return (
    <div>
      <Link to="/new">Post Topic</Link>
      Topic List {loading && "Loading..."}
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            {topic.text} ({topic.upvotes})
            <button onClick={props.upvoteTopic.bind(null, topic.id)}>+</button>
            <button onClick={props.downvoteTopic.bind(null, topic.id)}>
              -
            </button>
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
