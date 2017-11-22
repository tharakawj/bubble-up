import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { post } from "../utils/request";
import { topicCreated } from "../actions";
import TopicForm from "../component/TopicForm";

class NewTopic extends Component {
  state = { text: "", submitting: false, error: "" };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    post("topics", { text: this.state.text })
      .then(data => {
        this.setState({ submitting: false });
        this.props.topicCreated(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error.message, submitting: false });
      });
  };

  render() {
    return (
      <div>
        New Topic
        <Link to="/">Back</Link>
        <TopicForm
          buttonText="Post"
          text={this.state.text}
          disabled={this.state.submitting}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(null, { topicCreated })(NewTopic);
