import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Complex.css";

export default class Complex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgTime: null,
      intervals: [],
      X: null,
      Y: null,
      tracker: 0,
      showButton: false,
      showResults: false,
      showBall: true,
      totalTime: null
    };
    this.showResults = this.showResults.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleIntervals = this.handleIntervals.bind(this);
  }
  componentDidMount() {
    this.setState(
      {
        orgTime: new Date(),
        X: `${Math.floor(Math.random() * 85)}%`,
        Y: `${Math.floor(Math.random() * 90)}%`
      },
      () => console.log("State updated withing comp mount")
    );
  }

  showResults() {
    this.setState({
      showButton: false,
      showResults: true
    });
  }

  handleClick() {
    const Xvalue = `${Math.floor(Math.random() * 85)}%`;
    const Yvalue = `${Math.floor(Math.random() * 90)}%`;
    const track = this.state.tracker;
    const clickTime = new Date();
    let inte = null;
    if (this.state.tracker < 7) {
      inte = this.state.intervals;
      inte.push(clickTime);
      this.setState(
        {
          X: Xvalue,
          Y: Yvalue,
          tracker: track + 1,
          intervals: inte
        },
        () => console.log("State updated withing tracker")
      );
    } else {
      this.setState(
        {
          showBall: false,
          showButton: true,
          totalTime: clickTime - this.state.orgTime
        },
        () => console.log("State updated outside tracker")
      );
      this.handleIntervals();
    }
  }

  handleIntervals() {
    const inte = this.state.intervals;
    let calcu = [];
    for (let i = 1; i < inte.length; i++) {
      calcu.push(inte[i] - inte[i - 1]);
    }
    calcu.unshift(inte[0] - this.state.orgTime);
    this.setState(
      {
        intervals: calcu
      },
      () => console.log("State updated inside interval handler tracker")
    );
  }

  render() {
    return (
      <div className="Complex">
        {this.state.showBall && (
          <div
            onClick={this.handleClick}
            style={{ top: this.state.X, left: this.state.Y }}
            className="Complex-Circle"
          >
            Click me
          </div>
        )}
        {this.state.showButton && (
          <button className="Complex-Show" href="#" onClick={this.showResults}>
            Show results
          </button>
        )}
        {this.state.showResults && (
          <div className="Complex-Details">
            <h3>
              It took a total time of {this.state.totalTime} Milliseconds for
              this task to be completed
            </h3>
            <h6>Interval between clicks:</h6>
            {this.state.intervals.map((i, idx) => (
              <div>
                <h6>{`Interval ${idx + 1}: ${i} Milliseconds`}</h6>
              </div>
            ))}
            <Link className="Complex-Link" to="/">
              Home
            </Link>
          </div>
        )}
      </div>
    );
  }
}
