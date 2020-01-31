import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function App() {
  return (
    <div className="Home">
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
