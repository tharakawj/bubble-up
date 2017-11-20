import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./containers/HomePage";
import NewTopic from "./containers/NewTopic";
import EditTopic from "./containers/EditTopic";
import NotFoundPage from "./containers/NotFoundPage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/new" component={NewTopic} />
              <Route path="/topics/:id" component={EditTopic} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
