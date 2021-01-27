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
          </Switch>
        </Router>
      </GlobalContextProvider>
    </div>
  );
};

export default App;
