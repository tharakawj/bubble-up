import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TopicList from "./containers/TopicList";
import NewTopic from "./containers/NewTopic";
import EditTopic from "./containers/EditTopic";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={TopicList} />
            <Route path="/new" component={NewTopic} />
            <Route path="/topics/:id" component={EditTopic} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
