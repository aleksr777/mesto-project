import { loadInitialCards, removeCards } from './card.js';
import { handleProfileInfo } from './index.js';
import { openPopup, closePopup } from './utils.js';
import { popupWindows, popupProfile, popupCardForm, createCardForm, saveProfileForm, inputName, inputProfession, profileName, profileProfession, profileAvatar, openPopupProfile, closeCurrentPopup, submitCardForm, submitProfile } from './modal.js';

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
  })
    .then(res => {
      if (res.ok) {
        console.log(inputName, inputProfession);
        closePopup(popupProfile);
        profileName.textContent = inputName;
        profileProfession.textContent = inputProfession;
        setTimeout(() => {
          submitProfile.textContent = 'Сохранить';
          submitProfile.removeAttribute('disabled');
        }, 300);
      }
      else {
        submitProfile.textContent = 'Сохранить';
        submitProfile.removeAttribute('disabled');
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
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
  })
    .then(res => {
      if (res.ok) {
        closePopup(popupCardForm);
        removeCards();
        getInitialCards();
        setTimeout(() => {
          submitCardForm.textContent = 'Cоздать';
          submitCardForm.removeAttribute('disabled');
        }, 300);
      }
      else {
        submitCardForm.textContent = 'Cоздать';
        submitCardForm.removeAttribute('disabled');
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const deleteCardOnServer = async (card, cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
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

export { getInitialCards, sendNewCard, deleteCardOnServer, getProfileInfo, sendProfileInfo };