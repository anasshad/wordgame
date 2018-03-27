import React from "react";
import ReactDOM from "react-dom";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./index.css";
import App from "./App";
import ResultPage from "./components/ResultPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" render={() => <App letters={5} />} />
      <Route path="/game_over/:score" component={ResultPage} />
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
