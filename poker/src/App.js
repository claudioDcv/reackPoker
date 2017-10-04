import React, { Component } from 'react';
import './App.css';

import { getCards } from './services/pokerApi';
import pokerPlay from './services/pokerPlay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstHand: [],
      secondHand: [],
      win: null,
      secondHandShow: true,
      firstHandShow: true,
    };
    this.handlerClick = this.handlerClick.bind(this);
    this.checkWin =  this.checkWin.bind(this);
  }
  handlerClick(name) {
    const cb = (data) => {
      console.log(data);
      this.setState({ [name]: data.data });
      if (name === 'secondHand') {
        this.setState({ 'secondHandShow': true });
      } else {
        this.setState({ 'firstHandShow': true });
      }
    };
    this.setState({
      'secondHandShow': name !== 'secondHand',
      'firstHandShow': name === 'secondHand',
    });
    getCards(cb);
  }
  checkWin() {
    console.log('CHAN!!!');
    pokerPlay.check('1', this.state.firstHand, this.state.secondHand);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Poker</h1>
        </header>
        <h1>Jugador 1</h1>
        {this.state.firstHandShow && (
          <button onClick={() => {this.handlerClick('firstHand'); }}>
            Revolver
          </button>
        )}
        <ul>
          {this.state.firstHand.map((e, i) => (
            <li key={i} className={'card ' + e.suit}>{e.number}</li>
          ))}
        </ul>
        <h1>Jugador 2</h1>
        {this.state.secondHandShow && (
          <button onClick={() => {this.handlerClick('secondHand'); }}>
            Revolver
          </button>
        )}
        <ul>
          {this.state.secondHand.map((e, i) => (
            <li key={i} className={'card ' + e.suit}>{e.number}</li>
          ))}
        </ul>
        {this.state.secondHand.length > 0 && this.state.firstHand.length > 0 && (
          <button onClick={this.checkWin}>
            Seleccionar Mano Ganadora
          </button>)}
      </div>
    );
  }
}

export default App;
