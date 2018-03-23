import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import words from 'an-array-of-english-words';
import {numberOfLetters, wordsWithLetters} from './utils';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      words: null
    }
  }

  componentDidMount(){
    const fourLetterWords = wordsWithLetters(numberOfLetters(4))
    this.updateWords(fourLetterWords)
  }

  updateWords(newWords){
    this.setState({
      words: newWords
    })
  }

  render() {
    const {words} = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
