import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function App() {
  return (
    <div className="Home">
      <h5>The task will start immediately</h5>
      <h5>The user is to click each button (circle) as soon as they can</h5>
      <h5>
        Simple task always starts with a button on top left, then it is random
        between 4 locations
      </h5>
      <h5>
        Complex task always starts with a button on random location, the
        remaining locations are random as well
      </h5>
      <Link className="Home-Link" to="/Simple">
        Simple Task
      </Link>
      <Link className="Home-Link" to="/Complex">
        Complex Task
      </Link>
    </div>
  );
}

export default App;
