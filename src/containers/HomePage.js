import React from "react";
import { connect } from "react-redux";

import { getHomeTopics } from "../selectors";
import { TOPICS_IN_HOMEPAGE } from "../constants/appConstants";

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
    topics: getHomeTopics(state, TOPICS_IN_HOMEPAGE),
    loading: state.topics.loading,
    error: state.topics.error
  };
}

export default connect(mapStateToProps)(HomePage);
