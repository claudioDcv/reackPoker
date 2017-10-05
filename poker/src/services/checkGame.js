const orderByNumber = deal => {
  return deal.sort((a, b) => {
    if(a.number > b.number) return -1;
    if(a.number < b.number) return 1;
    return 0;
  });
};

const consistentCard = (list) => {
  const remap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 }
  const remapSuit = { clubs: 1, diamonds: 2, hearts: 3, spades: 4 }
  const h = [[], []]
  list.forEach(e => {
    h[0].push(remap[e.number])
    h[1].push(remapSuit[e.suit])
  })
  return orderByNumber(h)
}

const groupBy = xs => {
  return xs.reduce((rv, x) => {
    (rv[x] = rv[x] || []).push(x);
    return rv;
  }, {});
};

const obtainOneSuit = arr => {
  const list = []
  Object.keys(arr).forEach(e => {
    list.push(arr[e])
  })
  return list;
}

const obtainPair = arr => {
  const list = []
  Object.keys(arr).forEach(e => {
    if (arr[e].length === 2) {
      list.push(arr[e])
    }
  })
  return list;
}

const obtainThree = arr => {
  const list = []
  Object.keys(arr).forEach(e => {
    if (arr[e].length === 3) {
      list.push(arr[e])
    }
  })
  return list;
}

const straightIndividual = (h1) => {
  let result = false;
  const arr = h1[0]
  // Simple Straight
  arr.forEach((e, i) => {
    if (e + 1 === arr[i + 1]) {
      result = true
    }
  })
  // desorder Straight
  let endOrder = 0
  let isOk = false
  arr.forEach((e, i) => {
    if (e + 1 !== arr[i + 1]) {
      if (!isOk) {
        endOrder = e
        isOk = true
      }

    }
  })
  const indexEndOrder = arr.indexOf(endOrder)
  //reorder consecuvite
  const arrA = arr.filter((e, i) => i <= indexEndOrder)
  const arrB = arr.filter((e, i) => i > indexEndOrder)
  const reorderConsecutive = arrB.concat(arrA)
  //Eval consecuvite array
  let isStraight = true
  reorderConsecutive.forEach((e, i) => {
    if (i !== reorderConsecutive.length) {
      const a = e
      const b = reorderConsecutive[i + 1] - 1 || e
      if(!(a === b || (a === 14 && b === 1))){
        isStraight = false
      }
    }
  })
  return isStraight
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
  h1 = obtainPair(groupBy(h1[0]));
  h2 = obtainPair(groupBy(h2[0]));

  if (h1.length === 1 && h2.length !== 1) return 0
  if (h1.length !== 1 && h2.length === 1) return 1
  return -1
}
// 3. Two​ ​Pairs: ​ ​Two​ different​ ​ ​pairs.
const twoPair = (h1, h2) => {
  h1 = obtainPair(groupBy(h1[0]));
  h2 = obtainPair(groupBy(h2[0]));

  if (h1.length === 2 && h2.length !== 2) return 0
  if (h1.length !== 2 && h2.length === 2) return 1
  return -1
}
// 4. Three​ ​of​ a​ ​ Kind:​ ​ Three​ ​ cards​ ​ ​of ​ the​ ​ ​same​ ​value.
const threeOfAKind = (h1, h2) => {
  h1 = obtainThree(groupBy(h1[0]));
  h2 = obtainThree(groupBy(h2[0]));

  if (h1.length === 1 && h2.length !== 1) return 0
  if (h1.length !== 1 && h2.length === 1) return 1
  return -1
}
// 5. Straight:​ ​All​ ​cards​ ​are ​ ​consecutive ​ ​values.
const straight = (h1, h2) => {
  const h1Result = straightIndividual(h1)
  const h2Result = straightIndividual(h2)
  if (h1Result && !h2Result) return 0
  if (!h1Result && h2Result) return 1
  return -1
}
// 6. Flush: ​ ​All​ ​cards​ ​of​ ​the​ ​same​ ​suit.
const fush = (h1, h2) => {
  h1 = obtainOneSuit(groupBy(h1[1]));
  h2 = obtainOneSuit(groupBy(h2[1]));

  if (h1.length === 1 && h2.length !== 1) return 0
  if (h1.length !== 1 && h2.length === 1) return 1
  return -1
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

const whoIsWin = v => {
  if (v === -1) {
    return 'Empate';
  }
  return v === 0 ? 'Jugador 1 Gana' : 'Jugador 2 Gana';
}

export const checkGame = (h1, h2) => {
  const hand1 = consistentCard(h1)
  const hand2 = consistentCard(h2)
  let winner = -1;

  if(!equal(hand1, hand2)) {// true = equal, false = distinc
    console.log('highCard', whoIsWin(highCard(hand1, hand2)));
    console.log('onePair', whoIsWin(onePair(hand1, hand2)));
    console.log('twoPair', whoIsWin(twoPair(hand1, hand2)));
    console.log('threeOfAKind', whoIsWin(threeOfAKind(hand1, hand2)));
    console.log('straight', whoIsWin(straight(hand1, hand2)));
    console.log('fush', whoIsWin(fush(hand1, hand2)));
  }
  console.log(winner);
}
