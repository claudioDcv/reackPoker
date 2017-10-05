import axios from 'axios';

const obtainToken = 'https://services.comparaonline.com/dealer/deck';
const obtainCards = (token, n) => `https://services.comparaonline.com/dealer/deck/${token}/deal/${n}`;

const getToken = () => localStorage.getItem('token')
const setToken = token => localStorage.setItem('token', token)
// 405 si no hay cartas suficientes
// 404 si no existe baraja o el token expiro, reiniciar juego
export const newToken = () => {
  axios.post(obtainToken)
  .then((response) => {
    console.log(`init new token ${response.data}`);
    setToken(response.data)
  }).catch((error) => {
    newToken()
  });
}

const getApiToken = cb => {
  axios.post(obtainToken)
  .then((response) => {
    console.log(`new token ${response.data}`);
    setToken(response.data)
    cb()
  }).catch((error) => {
    getApiToken(cb)
  });
}

export const getCards = cb => {
  // si existe token se hace consulta a cartas
  if (getToken()) {
    axios.get(obtainCards(getToken(), 5))
    .then((response) => {
      cb(response)
    })
    .catch((error) => {
      if (!error.response) {
        getCards(cb)
      } else {
        console.log(error.response.status);
        switch (error.response.status) {
          case 500:
              getCards(cb)
            break;
          case 405:
              getApiToken(() => cb(405))
            break;
          case 404:
              getApiToken(() => cb(404))
            break;
          default:
        }
      }
    });
  }
}
//
// const getCards = cb => {
//   axios.post(obtainToken)
//   .then((response) => {
//     axios.get(obtainCards(response.data))
//     .then((response) => {
//       cb(response)
//     })
//     .catch((error) => {
//       debugger
//       console.log(error.response.status);
//       getCards(cb);
//     });
//   })
//   .catch((error) => {
//     debugger
//     console.log(error.response.status);
//     getCards(cb);
//   });
// };
//
// export {
//   getCards,
// };
