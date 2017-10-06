import React, { Component } from 'react'
import { Alert, Button } from 'reactstrap'
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
      winUser: '',
      showButton: false,
      player: -1,
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
      winUser: '',
      player: -1,
    });
  }
  handlerClick(name) {
    this.setState({ showButton: true })
    const cb = (data) => {
      if (data === 405 || data === 404) {
        this.setState({
          firstHand: [],
          secondHand: [],
          message: 'Nuevo Juego',
          secondHandShow: true,
          firstHandShow: true,
          cards: 0,
          winUser: '',
          player: -1,
        });
      } else {
        this.setState({
          [name]: data.data,
          message: 'Todo Ok',
          cards: this.state.cards + 5,
          player: -1,
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
    const { player, str} = (checkGame(this.state.firstHand, this.state.secondHand));
    this.setState({
      winUser: str,
      showButton: false,
      player,
    })
  }
  render() {
    return (
      <div className="App">
        <header className="jumbotron">
          {this.state.message} | Cartas Jugadas {this.state.cards} / 52
          <h1 className="App-title">Poker  {this.state.winUser}</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.state.cards > 0 && <Button color="danger" onClick={this.restart}>Reiniciar</Button>}
            </div>
            <div className="col-md-6">
              <h1>Jugador 1</h1>
              <hr />
                <Alert color={this.state.player === 0 ? 'success' : 'light'} className="card-container">
                  {this.state.firstHand.map((e, i) => (
                    <div key={i} className={'poker-card ' + e.suit}>{e.number}</div>
                  ))}
                </Alert>
                {this.state.firstHandShow &&
                  <Button color="success" onClick={() => {this.handlerClick('firstHand'); }}>
                    Pedir Mano
                  </Button>}
            </div>
            <div className="col-md-6">
              <h1>Jugador 2</h1>
              <hr />
              <Alert color={this.state.player === 1 ? 'success' : 'light'} className="card-container">
                {this.state.secondHand.map((e, i) => (
                  <div key={i} className={'poker-card ' + e.suit}>{e.number}</div>
                ))}
              </Alert>
              {this.state.secondHandShow &&
                <Button color="success" onClick={() => {this.handlerClick('secondHand'); }}>
                  Pedir Mano
                </Button>}
            </div>
          </div>
        </div>
        {this.state.showButton && this.state.secondHandShow === false && this.state.firstHandShow === false &&
          <div>
            <hr />
            <Button color="success" onClick={this.checkWin}>
              Seleccionar Mano Ganadora
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default App;
