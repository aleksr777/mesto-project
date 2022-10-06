import { openPopupImage } from './modal.js';
import { deleteCardOnServer, getInitialCards } from './api.js';
import { profileId } from './index.js';

const inputPlaceName = document.querySelector('#card-name-input');
const inputlink = document.querySelector('#card-link-input');
const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);
const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

const removeCards = () => {
  const cards = cardsBlock.querySelectorAll('.card');
  cards.forEach(card => {
    card.remove();
  });
}

const deleteCard = async (closeButton) => {
  const card = closeButton.closest('.card');
  const idCard = card.getAttribute('card-id');
  deleteCardOnServer(card, idCard);
};

const deleteCurrentCard = (event) => {
  deleteCard(event.currentTarget);
  event.stopPropagation();
}

const toggleLikeButton = (likeButton) => {
  likeButton.classList.toggle('card__like-button_activ');
};

const toggleLikeCurrentButton = (event) => {
  toggleLikeButton(event.currentTarget);
  event.stopPropagation();
}

const createCard = (card, splashScreen) => {
  const newCard = cloneNodeTemplate(cardTemplate.content);
  newCard.querySelector('.card__text').textContent = card.name;
  newCard.querySelector('.card__img').src = card.link;
  newCard.querySelector('.card__img').onerror = () => { newCard.querySelector('.card__img').src = splashScreen; }
  newCard.querySelector('.card__picture').addEventListener('click', (event) => openPopupImage(event));
  newCard.querySelector('.card__like-button').addEventListener('click', (event) => toggleLikeCurrentButton(event));
  newCard.querySelector('.card__trash-button').addEventListener('click', (event) => deleteCurrentCard(event));
  if (card.numLikes === 0) {
    newCard.querySelector('.card__like-button').style.marginTop = '';
    newCard.querySelector('.card__like-number').textContent = '';
  }
  else {
    newCard.querySelector('.card__like-button').style.marginTop = '-15px';
    newCard.querySelector('.card__like-number').textContent = card.numLikes;
  }
  if (profileId !== card.owner._id) {
    newCard.querySelector('.card__trash-button').style.display = 'none';
  }
  newCard.setAttribute('card-id', card._id);
  return newCard;
}

const loadInitialCards = (initialCards) => {
  initialCards = initialCards.reverse()
  initialCards.forEach(card => {
    card.name = card.name;
    card.link = card.link;
    card.numLikes = 0;
    card.likes.forEach(el => {
      card.numLikes += 1;
    });
    cardsBlock.prepend(createCard(card, splashScreen));
  });
}

export { loadInitialCards, /* enterDataNewCard, */removeCards, inputPlaceName, inputlink }; 