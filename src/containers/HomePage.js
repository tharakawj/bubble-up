import React from "react";
import { connect } from "react-redux";

import { getHomeTopics } from "../selectors";

const HomePage = ({ topics, loading }) => (
  <div>
    Topic List {loading && "Loading..."}
    <ul>
      {topics.map(topic => (
        <li key={topic.id}>
          {topic.text} ({topic.upvotes})
        </li>
      ))}
    </ul>
  </div>
);

function mapStateToProps(state) {
  return {
    topics: getHomeTopics(state),
    loading: state.topics.loading,
    error: state.topics.error
  };
}

export default connect(mapStateToProps)(HomePage);
