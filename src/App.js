import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Simple from "./Simple";
import Complex from "./Complex";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/simple" render={() => <Simple />} />
        <Route exact path="/complex" render={() => <Complex />} />
      </Switch>
    </div>
  );
}

export default App;
