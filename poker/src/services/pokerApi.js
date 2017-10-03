import axios from 'axios';

const obtainToken = 'https://services.comparaonline.com/dealer/deck';
const obtainCards = (token) => `https://services.comparaonline.com/dealer/deck/${token}/deal/5`;


const getCards = cb => {
  axios.post(obtainToken)
  .then((response) => {
    localStorage.setItem('token',response.data);
    axios.get(obtainCards(localStorage.getItem('token')))
    .then((response) => {
      cb(response)
    })
    .catch((error) => {
      getCards(cb);
    });
  })
  .catch((error) => {
    getCards(cb);
  });
};

export {
  getCards,
};
