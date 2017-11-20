import React from "react";
import { connect } from "react-redux";

const HomePage = ({ value }) => <div>Topic List {value}</div>;

function mapStateToProps(state) {
  return {
    value: state.value
  };
}

export default connect(mapStateToProps)(HomePage);
