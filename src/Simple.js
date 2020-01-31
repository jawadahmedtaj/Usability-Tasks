import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Simple.css";

export default class Simple extends Component {
  static defaultProps = {
    axis: [
      { X: "25%", Y: "25%" },
      { X: "50%", Y: "25%" },
      { X: "25%", Y: "75%" },
      { X: "50%", Y: "75%" }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      orgTime: null,
      intervals: [],
      X: "25%",
      Y: "25%",
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
        orgTime: new Date()
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
    const value = Math.floor(Math.random() * this.props.axis.length);
    const track = this.state.tracker;
    const clickTime = new Date();
    let inte = null;
    if (this.state.tracker < 7) {
      inte = this.state.intervals;
      inte.push(clickTime);
      this.setState(
        {
          X: this.props.axis[value].X,
          Y: this.props.axis[value].Y,
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
      <div className="Simple">
        {this.state.showBall && (
          <div
            onClick={this.handleClick}
            style={{ top: this.state.X, left: this.state.Y }}
            className="Simple-Circle"
          >
            Click me
          </div>
        )}
        {this.state.showButton && (
          <button className="Simple-Show" href="#" onClick={this.showResults}>
            Show results
          </button>
        )}
        {this.state.showResults && (
          <div className="Simple-Details">
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
            <Link className="Simple-Link" to="/">
              Home
            </Link>
          </div>
        )}
      </div>
    );
  }
}
