import { loadInitialCards } from './card.js';
import { handleProfileInfo } from './index.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'f31bf66b-98c5-4066-9b1a-67f29063c0e2',
    'Content-Type': 'application/json'
  }
}

const getProfileInfo = () => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      handleProfileInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const sendProfileInfo = (inputName, inputProfession) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputName,
      about: inputProfession
    })
  });
}

const getInitialCards = () => {
  let initialCards = [];
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      data.forEach(element => {
        initialCards.push(element);
      });
      loadInitialCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
}

const sendNewCard = (cardName, cardLink) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,      
    })
  });
}

export { getInitialCards, sendNewCard, getProfileInfo, sendProfileInfo };