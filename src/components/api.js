import { updateCards, putLikeLocal, deleteLikeLocal } from './card.js';
import { submitCardForm } from './index.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'f31bf66b-98c5-4066-9b1a-67f29063c0e2',
    'Content-Type': 'application/json'
  }
};

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => { return getResponseData(res) })
};

const sendProfileInfo = (name, profession) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: profession
    })
  });
};

const sendAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
    .then((res) => { return getResponseData(res) });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => { return getResponseData(res) });
};

const sendNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then((res) => { return getResponseData(res) });
};

const deleteCardOnServer = async (card, cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then((res) => { return getResponseData(res) });
};

const putLikeOnServer = async (likeButton, card, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then((res) => { return getResponseData(res) });
};

const deleteLikeOnServer = async (likeButton, card, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then((res) => { return getResponseData(res) });
};

export { getInitialCards, sendNewCard, deleteCardOnServer, putLikeOnServer, deleteLikeOnServer, getProfileInfo, sendProfileInfo, sendAvatar };