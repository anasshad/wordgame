import React from "react";

const ResultPage = ({ params, score }) => {
  console.log(params)
  return (
    <div>
      <h2>Time's Up</h2>
      <h4>Your Score: {score}</h4>
    </div>
  );
};

export default ResultPage;
