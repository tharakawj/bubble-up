import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { fetchTopics } from "./actions";
import HomePage from "./containers/HomePage";
import NewTopic from "./containers/NewTopic";
import EditTopic from "./containers/EditTopic";
import NotFoundPage from "./containers/NotFoundPage";

store.dispatch(fetchTopics());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
