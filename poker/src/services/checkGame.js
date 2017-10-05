const consistentCard = (list) => {
  const remap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 }
  const remapSuit = { clubs: 1, diamonds: 2, hearts: 3, spades: 4 }
  const h = [[], []]
  list.forEach(e => {
    h[0].push(remap[e.number])
    h[1].push(remapSuit[e.suit])
  })
  return h
}

// -1 no gana ninguno
// 0 gana left
// 1 gana rigth
const equal = (h1, h2) => {
  for(var i = h1[0].length; i--;) {
    if(h1[0][i] !== h2[0][i]) return false;
  }
  for(var i = h1[1].length; i--;) {
    if(h1[1][i] !== h2[1][i]) return false;
  }
  return true;
};
// 1. High​ Card:​ ​ Highest​ ​ value​ ​ card.​ ​ Order​ ​ is​ ​ ​2, ​ ​3, ​ ​4, ​ 5,​ ​ 6,​ ​ 7,​ ​ ​8,​ ​9,​ Ten,​ ​ ​Jack, ​ ​Queen,​ ​King, Ace.
const highCard = (h1, h2) => {
  const majorH1 = Math.max(...h1[0])
  const majorh2 = Math.max(...h2[0])
  if (majorH1 > majorh2) return 0
  if (majorH1 < majorh2) return 1
  return -1
}
// 2. One​ ​Pair:​ ​Two​ cards​ ​ ​of ​ ​the ​ ​same ​ value.​
const onePair = (h1, h2) => {

}
// 3. Two​ ​Pairs: ​ ​Two​ different​ ​ ​pairs.
const twoPair = (h1, h2) => {

}
// 4. Three​ ​of​ a​ ​ Kind:​ ​ Three​ ​ cards​ ​ ​of ​ the​ ​ ​same​ ​value.
const threeOfAKind = (h1, h2) => {

}
// 5. Straight:​ ​All​ ​cards​ ​are ​ ​consecutive ​ ​values.
const straight = (h1, h2) => {

}
// 6. Flush: ​ ​All​ ​cards​ ​of​ ​the​ ​same​ ​suit.
const fush = (h1, h2) => {

}
// 7. Full​ ​House:​ ​Three​ ​of ​ ​a​ ​kind ​ and​ ​ ​a ​ pair.​
const fullHouse = (h1, h2) => {

}
// 8. Four​ ​of ​ ​a​ ​Kind:​ Four​ ​ ​cards​ ​of​ the​ ​ same​ ​ ​value.
const fourOfAKind = (h1, h2) => {
  return -1;
}
// 9. Straight​ ​Flush:​ All​ ​ cards​ ​ are​ ​ ​consecutive​ ​values ​ ​of​ ​same ​ suit.​
const straightFlush = (h1, h2) => {

}
// 10. Royal​ ​Flush:​ ​Ten,​ ​Jack,​ Queen,​ ​ ​King,​ ​Ace ​ ​of​ same​ ​ ​suit
const royalFlush = (h1, h2) => {

}

export const checkGame = (h1, h2) => {
  const hand1 = consistentCard(h1)
  const hand2 = consistentCard(h2)
  let winner = -1;

  if(!equal(hand1, hand2)) {// true = equal, false = distinc
    winner = highCard(hand1, hand2);// -1 = equal, 0 h1, 1 h2
  }
  console.log(winner);
}
