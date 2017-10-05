import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import { getCards, newToken } from './services/pokerApi'
import { checkGame } from './services/checkGame'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstHand: [],
      secondHand: [],
      win: null,
      secondHandShow: true,
      firstHandShow: true,
      message: 'Que siga el juego',
      cards: 0,
    };
    this.handlerClick = this.handlerClick.bind(this)
    this.restart =  this.restart.bind(this)
    this.checkWin =  this.checkWin.bind(this)
    newToken()
  }
  restart() {
    newToken()
    this.setState({
      firstHand: [],
      secondHand: [],
      message: 'Nuevo Juego',
      secondHandShow: true,
      firstHandShow: true,
      cards: 0,
    });
  }
  handlerClick(name) {
    const cb = (data) => {
      if (data === 405 || data === 404) {
        this.setState({
          firstHand: [],
          secondHand: [],
          message: 'Nuevo Juego',
          secondHandShow: true,
          firstHandShow: true,
          cards: 0,
        });
      } else {
        this.setState({
          [name]: data.data,
          message: 'Todo Ok',
          cards: this.state.cards + 5,
        });
      }
    };
    if (name === 'secondHand') {
      this.setState({ secondHandShow: false })
    } else {
      this.setState({ firstHandShow: false })
    }
    getCards(cb);
  }
  checkWin() {
    console.log('CHAN!!!')
    this.setState({
      secondHandShow: true,
      firstHandShow: true,
    });
    checkGame(this.state.firstHand, this.state.secondHand)
  }
  render() {
    return (
      <div className="App">
        <header className="jumbotron">
          {this.state.message} | Cartas Jugadas {this.state.cards} / 52
          <h1 className="App-title">Poker</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <button onClick={this.restart}>Reiniciar</button>
            </div>
            <div className="col-md-6">
              <h1>Jugador 1</h1>
              <hr />
              {this.state.firstHandShow &&
                <button onClick={() => {this.handlerClick('firstHand'); }}>
                  Revolver
                </button>}
                <div className="card-container">
                  {this.state.firstHand.map((e, i) => (
                    <div key={i} className={'poker-card ' + e.suit}>{e.number}</div>
                  ))}
                </div>
            </div>
            <div className="col-md-6">
              <h1>Jugador 2</h1>
              <hr />
              {this.state.secondHandShow &&
                <button onClick={() => {this.handlerClick('secondHand'); }}>
                  Revolver
                </button>}
              <div className="card-container">
                {this.state.secondHand.map((e, i) => (
                  <div key={i} className={'poker-card ' + e.suit}>{e.number}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {this.state.secondHand.length > 0 && this.state.firstHand.length > 0 && <button onClick={this.checkWin}>Seleccionar Mano Ganadora</button>}
      </div>
    );
  }
}

export default App;
