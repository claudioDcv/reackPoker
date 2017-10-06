const consistentCard = (list) => {
  const remap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 14 }
  const remapSuit = { clubs: 1, diamonds: 2, hearts: 3, spades: 4 }
  const h = [[], []]
  list.forEach(e => {
    h[0].push(remap[e.number])
    h[1].push(remapSuit[e.suit])
  })
  h[0] = h[0].sort((a, b) => a - b)
  return h
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
  // eslint-disable-next-line
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
      if(!(a === b || (a === 14 && b === 1))) {
        isStraight = false
      }
    }
  })
  return isStraight
}

const fullHouseSingle = h => {
  const list = []
  let ok3 = false
  let ok2 = false
  const arr = groupBy(h[0])

  Object.keys(arr).forEach(e => {
    if (arr[e].length === 3) {
      if (!ok3) {
        ok3 = true
        list.push(arr[e])
      }
    }
  })
  Object.keys(arr).forEach(e => {
    if (arr[e].length === 2) {
      if (!ok2) {
        ok2 = true
        list.push(arr[e])
      }
    }
  })
  return list;
}

const fourOfAKindSingle = arr => {
  const list = []
  Object.keys(arr).forEach(e => {
    if (arr[e].length === 4) {
      list.push(arr[e])
    }
  })
  return list;
}
// -1 no gana ninguno
// 0 gana left
// 1 gana rigth
const equal = (h1, h2) => {
  for(var i = h1[0].length; i--;) {
    if(h1[0][i] !== h2[0][i]) return false;
  }
  for(var j = h1[1].length; j--;) {
    if(h1[1][j] !== h2[1][j]) return false;
  }
  return true;
};
// 1. High​ Card:​ ​ Highest​ ​ value​ ​ card.​ ​ Order​ ​ is​ ​ ​2, ​ ​3, ​ ​4, ​ 5,​ ​ 6,​ ​ 7,​ ​ ​8,​ ​9,​ Ten,​ ​ ​Jack, ​ ​Queen,​ ​King, Ace.
const highCard = (h1, h2) => {

  let arr1 = h1[0].reverse()
  let arr2 = h2[0].reverse()

  for (let i = 0; i < 5; i++) {
    if(arr1[i] > arr2[i]) return 0
    if(arr1[i] < arr2[i]) return 1
  }
  return -1
}
// 2. One​ ​Pair:​ ​Two​ cards​ ​ ​of ​ ​the ​ ​same ​ value.​
const onePair = (h1, h2) => {
  h1 = obtainPair(groupBy(h1[0]))
  h2 = obtainPair(groupBy(h2[0]))

  if (h1.length === 1 && h2.length !== 1) return 0
  if (h1.length !== 1 && h2.length === 1) return 1
  return -1
}
// 3. Two​ ​Pairs: ​ ​Two​ different​ ​ ​pairs.
const twoPair = (h1, h2) => {
  h1 = obtainPair(groupBy(h1[0]))
  h2 = obtainPair(groupBy(h2[0]))

  if (h1.length === 2 && h2.length !== 2) return 0
  if (h1.length !== 2 && h2.length === 2) return 1
  return -1
}
// 4. Three​ ​of​ a​ ​ Kind:​ ​ Three​ ​ cards​ ​ ​of ​ the​ ​ ​same​ ​value.
const threeOfAKind = (h1, h2) => {
  h1 = obtainThree(groupBy(h1[0]))
  h2 = obtainThree(groupBy(h2[0]))

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
const flush = (h1, h2) => {
  h1 = obtainOneSuit(groupBy(h1[1]))
  h2 = obtainOneSuit(groupBy(h2[1]))

  if (h1.length === 1 && h2.length !== 1) return 0
  if (h1.length !== 1 && h2.length === 1) return 1
  return -1
}
// 7. Full​ ​House:​ ​Three​ ​of ​ ​a​ ​kind ​ and​ ​ ​a ​ pair.​
const fullHouse = (hand1, hand2) => {
  const h1 = fullHouseSingle(hand1)
  const h2 = fullHouseSingle(hand2)

  if (h1.length === 2 && h2.length !== 2) return 0
  if (h1.length !== 2 && h2.length === 2) return 1
  return -1
}
// 8. Four​ ​of ​ ​a​ ​Kind:​ Four​ ​ ​cards​ ​of​ the​ ​ same​ ​ ​value.
const fourOfAKind = (h1, h2) => {
  h1 = fourOfAKindSingle(groupBy(h1[0]))
  h2 = fourOfAKindSingle(groupBy(h2[0]))

  if (h1.length === 1 && h2.length !== 1) return 0
  if (h1.length !== 1 && h2.length === 1) return 1
  return -1
}
// 9. Straight​ ​Flush:​ All​ ​ cards​ ​ are​ ​ ​consecutive​ ​values ​ ​of​ ​same ​ suit.​
const straightFlush = (h1, h2) => {
  const straightResult = straight(h1, h2)
  const everyH1 = h1[1].every(e => e === h1[1][0])
  const everyH2 = h2[1].every(e => e === h2[1][0])
  if (everyH1 && (straightResult === 0 || straightResult === -1) && !everyH2) return 0
  if (everyH2 && (straightResult === 1 || straightResult === -1) && !everyH1) return 0
  return -1
}
// 10. Royal​ ​Flush:​ ​Ten,​ ​Jack,​ Queen,​ ​ ​King,​ ​Ace ​ ​of​ same​ ​ ​suit
// 10 11 12 13 14
const royalFlush = (h1, h2) => {
  const royalOrder = [10,11,12,13,14]
  const h1RoyalOrder = h1[0].every((e,i) => e === royalOrder[i])
  const h2RoyalOrder = h2[0].every((e,i) => e === royalOrder[i])

  const h1SameSuit = h1[1].every((e,i) => e === h1[1][0])
  const h2SameSuit = h2[1].every((e,i) => e === h2[1][0])

  if (h1RoyalOrder && h1SameSuit && !(h2RoyalOrder && h2SameSuit)) return 0
  if (h2RoyalOrder && h2SameSuit && !(h1RoyalOrder && h1SameSuit)) return 1
  return -1
}

const whoIsWin = (v, str) => v === 0 ? { player:0, str: `Jugador 1 Gana ${str}`} : { player:1, str: `Jugador 2 Gana ${str}`}

export const checkGame = (h1, h2) => {
  const hand1 = consistentCard(h1)
  const hand2 = consistentCard(h2)

  if(!equal(hand1, hand2)) {

    const r1 = royalFlush(hand1, hand2)
    const r2 = straightFlush(hand1, hand2)
    const r3 = fourOfAKind(hand1, hand2)
    const r4 = fullHouse(hand1, hand2)
    const r5 = flush(hand1, hand2)
    const r6 = straight(hand1, hand2)
    const r7 = threeOfAKind(hand1, hand2)
    const r8 = twoPair(hand1, hand2)
    const r9 = onePair(hand1, hand2)
    const r10 = highCard(hand1, hand2)

    if (r1 !== -1) return whoIsWin(r1, 'royalFlush')
    if (r2 !== -1) return whoIsWin(r2, 'straightFlush')
    if (r3 !== -1) return whoIsWin(r3, 'fourOfAKind')
    if (r4 !== -1) return whoIsWin(r4, 'fullHouse')
    if (r5 !== -1) return whoIsWin(r5, 'flush')
    if (r6 !== -1) return whoIsWin(r6, 'straight')
    if (r7 !== -1) return whoIsWin(r7, 'threeOfAKind')
    if (r8 !== -1) return whoIsWin(r8, 'twoPair')
    if (r9 !== -1) return whoIsWin(r9, 'onePair')
    if (r10 !== -1) return whoIsWin(r10, 'highCard')

  } else {
    return 'Empate'
  }
  return 'Empate'
}
