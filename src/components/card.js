import { openPopupImage } from './modal.js';
import { sendNewCard } from './api.js';

const inputPlaceName = document.querySelector('#card-name-input');
const inputlink = document.querySelector('#card-link-input');
const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);
const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

const card = {
  name: '',
  link: '',
};

const loadCardInfo = () => {
  card.name = inputPlaceName.value;
  card.link = inputlink.value;
  sendNewCard(card.name, card.link);
  cardsBlock.prepend(createCard(card, splashScreen));
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
  newCard.querySelector('.card__img').src = card.link;
  newCard.querySelector('.card__img').onerror = () => { newCard.querySelector('.card__img').src = splashScreen; }
  newCard.querySelector('.card__picture').addEventListener('click', (event) => openPopupImage(event));
  newCard.querySelector('.card__like-button').addEventListener('click', (event) => toggleLikeCurrentButton(event));
  newCard.querySelector('.card__trash-button').addEventListener('click', (event) => deleteCurrentCard(event));
  return newCard;
}

const loadInitialCards = (initialCards) => {
  initialCards.forEach(initCard => {
    card.name = initCard.name;
    card.link = initCard.link;
    cardsBlock.prepend(createCard(card, splashScreen));
  });
}

export { loadInitialCards, loadCardInfo, inputPlaceName, inputlink }; 