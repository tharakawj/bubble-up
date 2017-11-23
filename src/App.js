import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./component/Header";

import store from "./store";
import { fetchTopics } from "./actions";
import HomePage from "./containers/HomePage";
import NewTopic from "./containers/NewTopic";
import NotFoundPage from "./containers/NotFoundPage";

store.dispatch(fetchTopics());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/new" component={NewTopic} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
