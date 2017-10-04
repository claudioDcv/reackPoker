import axios from 'axios';

const api = 'https://services.comparaonline.com';
const obtainToken = `${api}/dealer/deck`;
const obtainCards = token => `${api}/dealer/deck/${token}/deal/5`;
const getToken = () => localStorage.getItem('token');
const setToken = token => localStorage.setItem('token', token);

const getCards = cb => {
  axios.get(obtainCards(getToken()))
  .then((response) => {
    cb(response)
  })
  .catch((error) => {
    console.log(error);
    axios.post(obtainToken)
    .then((response) => {
      setToken(response.data);
      getCards(cb);
    })
    .catch((error) => {
      getCards(cb);
    });
  });
};

export {
  getCards,
};
