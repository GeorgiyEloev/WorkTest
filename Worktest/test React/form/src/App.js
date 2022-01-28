import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Main from "./components/Main";

import "./App.scss";

function App() {
  let history = useHistory();

  return (
    <div className="App">
      <ul>
        <li onClick={() => history.push("/horror")}>
          <a href="">horror</a>
        </li>
        <li onClick={() => history.push("/series")}>
          <a href="">series</a>
        </li>
        <li onClick={() => history.push("/fantastic")}>
          <a href="">fantastic</a>
        </li>
      </ul>
      <Switch>
        <Route path="/horror">
          <Main name="horror" />
        </Route>
        <Route path="/series">
          <Main name="series" />
        </Route>
        <Route path="/fantastic">
          <Main name="fantastic" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
