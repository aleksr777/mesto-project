import { openPopupImage } from './modal.js';

const inputPlaceName = document.querySelector('#card-name-input');
const inputSrcLink = document.querySelector('#card-link-input');
const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);

const card = {
  placeName: '',
  srcLink: '',
  srcsetLink: '',
};

const initialCards = [
  {
    name: 'Камчатка',
    srcset: 'images/kamchatka.webp',
    src: 'images/kamchatka.jpg'
  },
  {
    name: 'Гора Эльбрус',
    srcset: 'images/mountain-elbrus.webp',
    src: 'images/mountain-elbrus.jpg'
  },
  {
    name: 'Домбай',
    srcset: 'images/dombai.webp',
    src: 'images/dombai.jpg'
  },
  {
    name: 'Озеро Байкал',
    srcset: 'images/baikal.webp',
    src: 'images/baikal.jpeg'
  },
  {
    name: 'Столбы выветривания – Маньпупунер',
    srcset: 'images/stolby-vyvetrivaniya.webp',
    src: 'images/stolby-vyvetrivaniya.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    srcset: 'images/karachaevsk.webp',
    src: 'images/karachaevsk.jpg'
  }
];

const loadCardInfo = () => {
  card.placeName = inputPlaceName.value;
  card.srcLink = inputSrcLink.value;
  card.srcsetLink = '';
  cardsBlock.prepend(createCard(card));
  inputPlaceName.value = '';
  inputSrcLink.value = '';
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

const createCard = (card) => {
  const newCard = cloneNodeTemplate(cardTemplate.content);
  newCard.querySelector('.card__text').textContent = card.placeName;
  newCard.querySelector('.card__img').src = card.srcLink;
  newCard.querySelector('.card__webp').srcset = card.srcsetLink;
  newCard.querySelector('.card__img').onerror = () => newCard.querySelector('.card__img').src = 'images/no-image.jpg';
  newCard.querySelector('.card__picture').addEventListener('click', (event) => openPopupImage(event));
  newCard.querySelector('.card__like-button').addEventListener('click', (event) => toggleLikeCurrentButton(event));
  newCard.querySelector('.card__trash-button').addEventListener('click', (event) => deleteCurrentCard(event));
  return newCard;
}

const loadInitialCards = () => {
  initialCards.forEach(initCard => {
    card.placeName = initCard.name;
    card.srcLink = initCard.src;
    card.srcsetLink = initCard.srcset;
    cardsBlock.prepend(createCard(card));
  });
}

export { loadInitialCards, loadCardInfo }; 