import React, { Component } from "react";
import styled from "styled-components";

const ClockWrapper = styled.div`
  height: 100px;
  width: 100px;
  border: 5px solid blue;
  border-radius: 100%;
  border-top-color: ${props => (props.seconds >= 45 ? "blue" : "transparent")};
  border-bottom-color: ${props => props.seconds >= 15 ? "yellow" : "transparent"};
  border-right-color: ${props => props.seconds >= 30 ? "red" : "transparent"};
  border-left-color: ${props => props.seconds > 0 ? "green" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  transform: rotate(45deg);
`;

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 60
    };
  }

  componentDidMount() {
    const interval = setInterval(this.timer, 1000);
    this.setState({
      interval
    });
  }

  timer = () => {
    if (this.state.seconds > 0) {
      this.setState({
        seconds: this.state.seconds - 1
      });
    } else {
      clearInterval(this.state.interval);
      this.props.timesUp();
    }
  };

  render() {
    const { seconds } = this.state;
    return <ClockWrapper seconds={seconds}><div style={{transform: 'rotate(-45deg)'}} >{seconds}</div></ClockWrapper>;
  }
}

export default Clock;
