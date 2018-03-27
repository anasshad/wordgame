import React, { Component } from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import { findScore, randomLetters, numberOfLetters } from "./utils";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Card from "./components/Card";
import Deck from "./components/Deck";
import Clock from "./components/Clock";
import ResultPage from "./components/ResultPage";
import { Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  align-items: center;
  justify-content: center;
  background: palevioletred;
`;

@DragDropContext(HTML5Backend)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      letters: null,
      words: [],
      score: 0,
      deckCards: [],
      timesUp: false
    };
    this.letterToDeck = this.letterToDeck.bind(this);
    this.findPositionInDeck = this.findPositionInDeck.bind(this);
    this.reorder = this.reorder.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  letterToDeck(letter) {
    let { letters, deckCards } = this.state;
    letters.splice(letters.indexOf(String(letter)), 1);
    deckCards.push(letter);
    this.setState({
      letters,
      deckCards
    });
  }

  findPositionInDeck(letter) {
    const { deckCards } = this.state;
    return deckCards.indexOf(letter);
  }

  reorder(from, to) {
    const { deckCards } = this.state;
    const source = deckCards.splice(from, 1);
    deckCards.splice(to, 0, source);
    this.setState({
      deckCards
    });
  }

  update() {
    const numOfLetters = this.props.letters;
    const letters = randomLetters(numOfLetters);
    const words = numberOfLetters(numOfLetters);
    this.setState({
      words,
      letters,
      deckCards: []
    });
  }

  getScore = () => {
    const { deckCards } = this.state;
    const score = findScore(deckCards);
    this.setState({
      addSeconds: score,
      score: this.state.score + score
    });
  };

  reset = () => {
    const { letters, deckCards } = this.state;
    this.setState({
      letters: [...letters, ...deckCards],
      deckCards: []
    });
  };

  timesUp = () => {
    this.setState({
      timesUp: true
    });
  };

  checkWord = () => {
    const { deckCards } = this.state;
    const words = numberOfLetters(5);
    if (words.indexOf(deckCards.join("")) !== -1) {
      this.getScore();
      this.update()
    } else{
      this.reset();
    }
  };

  cancelLetter = (letter) => {
    const {letters, deckCards} = this.state;
    letters.push(letter);
    deckCards.splice(deckCards.indexOf(letter), 1);
    this.setState({
      letters,
      deckCards
    })
  }

  render() {
    const { words, letters, score } = this.state;
    return (
      <div className="App">
        <Clock timesUp={this.timesUp} addSeconds={this.state.addSeconds} />
        <div>score: {score}</div>
        <CardContainer>
          {letters &&
            letters.map((l, i) => (
              <Card letter={l} removeLetter={this.letterToDeck} />
            ))}
        </CardContainer>
        <Deck
          letters={this.state.deckCards}
          positionInDeck={this.findPositionInDeck}
          reorder={this.reorder}
          cancelLetter={this.cancelLetter}
        />
        <button onClick={() => this.checkWord()}>Submit</button>
        <button onClick={() => this.reset()}>Reset</button>
        <button
          onClick={() => {
            this.setState({ score: this.state.score - 5 });
            this.update();
          }}
        >
          Skip
        </button>
        {this.state.timesUp && <Redirect to={"/game_over/" + score} />}
      </div>
    );
  }
}

export default App;
