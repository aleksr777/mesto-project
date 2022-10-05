import { openPopupImage } from './modal.js';
import { sendNewCard } from './api.js';
import { profileId } from './index.js';

const inputPlaceName = document.querySelector('#card-name-input');
const inputlink = document.querySelector('#card-link-input');
const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);
const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

const card = {
  name: '',
  link: '',
  numLikes: 0,
};

const loadCardInfo = () => {
  card.name = inputPlaceName.value;
  card.link = inputlink.value;
  card.numLikes = 0;
  cardsBlock.prepend(createCard(card, splashScreen));
  sendNewCard(card.name, card.link);
  inputPlaceName.value = '';
  inputlink.value = '';
}

const deleteCard = (closeButton) => {
  closeButton.closest('.card').remove();
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
  if (card.numLikes === 0) {
    newCard.querySelector('.card__like-button').style.marginTop = '';
    newCard.querySelector('.card__like-number').textContent = '';
  }
  else {
    newCard.querySelector('.card__like-button').style.marginTop = '-15px';
    newCard.querySelector('.card__like-number').textContent = card.numLikes;
  }
  if (card.numLikes === 0) {
    newCard.querySelector('.card__like-button').style.marginTop = '';
    newCard.querySelector('.card__like-number').textContent = '';
  }
  if (profileId === card.owner._id) {
    newCard.querySelector('.card__trash-button').style.display = 'block';
  }
  newCard.querySelector('.card__img').src = card.link;
  newCard.querySelector('.card__img').onerror = () => { newCard.querySelector('.card__img').src = splashScreen; }
  newCard.querySelector('.card__picture').addEventListener('click', (event) => openPopupImage(event));
  newCard.querySelector('.card__like-button').addEventListener('click', (event) => toggleLikeCurrentButton(event));
  newCard.querySelector('.card__trash-button').addEventListener('click', (event) => deleteCurrentCard(event));
  return newCard;
}

const loadInitialCards = (initialCards) => {
  initialCards.forEach(card => {
    card.name = card.name;
    card.link = card.link;
    card.numLikes = 0;
    card.likes.forEach(el => {
      card.numLikes += 1;
    });
    /* console.log(card.owner._id); */
    cardsBlock.prepend(createCard(card, splashScreen));
  });
}

export { loadInitialCards, loadCardInfo, inputPlaceName, inputlink }; 