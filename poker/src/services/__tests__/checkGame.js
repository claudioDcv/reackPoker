const assert = require('assert');
const { checkGame } = require('../checkGame');

const a = [{"number":"7","suit":"spades"},{"number":"Q","suit":"hearts"},{"number":"5","suit":"spades"},{"number":"9","suit":"spades"},{"number":"9","suit":"hearts"}]
const b = [{"number":"9","suit":"diamonds"},{"number":"10","suit":"spades"},{"number":"8","suit":"diamonds"},{"number":"6","suit":"clubs"},{"number":"10","suit":"diamonds"}]

const a1 = [{"number":"7","suit":"spades"},{"number":"Q","suit":"hearts"},{"number":"5","suit":"spades"},{"number":"9","suit":"spades"},{"number":"9","suit":"hearts"}]
const b1 = [{"number":"9","suit":"diamonds"},{"number":"10","suit":"spades"},{"number":"8","suit":"diamonds"},{"number":"6","suit":"clubs"},{"number":"10","suit":"diamonds"}]


describe('checkGame Test', () => {
  describe('checkGame 1', () => {
    it("checkGame", () => {
      assert.equal("Jugador 1 Gana highCard" , checkGame(a,b).str);
    });

    it("checkGame", () => {
      assert.equal("Jugador 1 Gana highCard" , checkGame(a1,b1).str);
    });

  });
});
