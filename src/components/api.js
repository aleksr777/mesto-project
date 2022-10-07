import { loadInitialCards, updateCards, putLikeLocal, deleteLikeLocal } from './card.js';
import { handleProfileInfo, updateProfileInfo, updateAvatar } from './index.js';
import { submitCardForm, submitProfile, submitAvatar } from './modal.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'f31bf66b-98c5-4066-9b1a-67f29063c0e2',
    'Content-Type': 'application/json'
  }
}

const returnButton = (button, text) => {
  button.textContent = text;
  button.removeAttribute('disabled');
}

const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
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
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputName,
      about: inputProfession
    })
  })
    .then(res => {
      if (res.ok) {
        updateProfileInfo();
      }
      else {
        returnButton(submitProfile, 'Сохранить');
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      returnButton(submitProfile, 'Сохранить');
      console.log(err);
    });
}

const sendAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        returnButton(submitAvatar, 'Сохранить');
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      updateAvatar(data.avatar);
    })
    .catch((err) => {
      returnButton(submitAvatar, 'Сохранить');
      console.log(err);
    });
}

const getInitialCards = () => {
  let initialCards = [];
  return fetch(`${config.baseUrl}/cards`, {
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
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then(res => {
      if (res.ok) {
        updateCards();
      }
      else {
        returnButton(submitCardForm, 'Cоздать');
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      returnButton(submitCardForm, 'Cоздать');
      console.log(err);
    });
}

const deleteCardOnServer = async (card, cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then(res => {
      if (res.ok) {
        card.remove();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const putLikeOnServer = async (likeButton, card, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(data => {
      putLikeLocal(likeButton, card, data.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

const deleteLikeOnServer = async (likeButton, card, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(data => {
      deleteLikeLocal(likeButton, card, data.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getInitialCards, sendNewCard, deleteCardOnServer, putLikeOnServer, deleteLikeOnServer, getProfileInfo, sendProfileInfo, sendAvatar };