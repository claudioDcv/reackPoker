const dict = {
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const converter = deal => {
  return deal.map(e => {
    return {
      suit: e.suit,
      number: parseInt(dict[e.number] || e.number),
    }
  })
};


const orderByNumber = deal => {
  return deal.sort((a, b) => {
    if(a.number > b.number) return -1;
    if(a.number < b.number) return 1;
    return 0;
  });
};
const isPair = (deal) => {
  debugger;
};


const check = (n, dealA, dealB) => {
  const a = orderByNumber(converter(dealA))
  const b = orderByNumber(converter(dealB))

  console.log(a[0] > b[0] ? a[0] : b[0]);

  console.log(a, b);
  //isPair(deal);

};




export default {
  check,
};
