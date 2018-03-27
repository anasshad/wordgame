import React, {Component} from "react";

class ResultPage extends Component{
  render(){
    const score = this.props.match.params.score;
    return (
      <div>
        <h2>Time's Up</h2>
        <h4>Your Score: {score} </h4>
      </div>
    )
  }
};

export default ResultPage;
