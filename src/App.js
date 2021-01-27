import React from "react";
import GlobalContextProvider from "./Contexts/GlobalContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <GlobalContextProvider>
        <Router>
          <Switch>
            <Route path="/:year/:branch" exact component={Home} />
            <Route path="/" exact component={Default} />
          </Switch>
        </Router>
      </GlobalContextProvider>
    </div>
  );
};

export default App;

const Default = () => {
  return (
    <div className="flex-row centered">
      <h4>You can check your paper through this link</h4>
      <p>
        Go to <strong>/year-1/cse</strong> for First Year CSE branch
      </p>
    </div>
  );
};
