import React from "react";
import Home from "./views/Home";
import Button from "./components/button";
import User from "./views/User";
import { BrowserRouter, Switch, Router, Route, Link } from "react-router-dom";
import "./styles/App.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
