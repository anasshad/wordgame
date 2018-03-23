import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {findScore, getWordsLetters} from './utils';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: null,
      letters: null,
      words: [],
      score: null
    }
  }

  componentDidMount(){
    this.update()
  }

  update(){
    const numOfLetters = this.props.letters;
    const [letters, words] = getWordsLetters(numOfLetters)
    this.setState({
      words,
      letters
    })
  }

  render() {
    const {words, letters} = this.state;     
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{letters}</h1>
        </header>
        <div>
          {
            words && words.map((w, i) => <div key={i}>{w}</div>)
          }
        </div>
      </div>
    );
  }
}

export default App;
