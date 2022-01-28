import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Footer from "./Footer";

function Main({ name }) {
  let history = useHistory();
  const years = ["2016", "2015", "2014", "2013", "2012", "2011"];
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {years.map((item) => {
          return (
            <li onClick={() => history.push(`/${name}/${item}`)}>
              <a href="">{item}</a>
            </li>
          );
        })}
      </ul>
      <Switch>
        {years.map((item) => {
          return (
            <Route path={`/${name}/${item}`}>
              <Footer name={name} item={item}/>
            </Route>
          );
        })}
      </Switch>
    </div>
  );
}

export default Main;
