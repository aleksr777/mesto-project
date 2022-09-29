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

const kamchatkaWebp = new URL('../images/kamchatka.webp', import.meta.url);
const kamchatkaJpg = new URL('../images/kamchatka.jpg', import.meta.url);

const elbrusWebp = new URL('../images/mountain-elbrus.webp', import.meta.url);
const elbrusJpg = new URL('../images/mountain-elbrus.jpg', import.meta.url);

const dombaiWebp = new URL('../images/dombai.webp', import.meta.url);
const dombaiJpg = new URL('../images/dombai.jpg', import.meta.url);

const baikalWebp = new URL('../images/baikal.webp', import.meta.url);
const baikalJpeg = new URL('../images/baikal.jpeg', import.meta.url);

const stolbyWebp = new URL('../images/stolby-vyvetrivaniya.webp', import.meta.url);
const stolbyJpg = new URL('../images/stolby-vyvetrivaniya.jpg', import.meta.url);

const karachaevskWebp = new URL('../images/karachaevsk.webp', import.meta.url);
const karachaevskJpg = new URL('../images/karachaevsk.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Камчатка',
    srcset: kamchatkaWebp,
    src: kamchatkaJpg
  },
  {
    name: 'Гора Эльбрус',
    srcset: elbrusWebp,
    src: elbrusJpg
  },
  {
    name: 'Домбай',
    srcset: dombaiWebp,
    src: dombaiJpg
  },
  {
    name: 'Озеро Байкал',
    srcset: baikalWebp,
    src: baikalJpeg
  },
  {
    name: 'Столбы выветривания – Маньпупунер',
    srcset: stolbyWebp,
    src: stolbyJpg
  },
  {
    name: 'Карачаево-Черкессия',
    srcset: karachaevskWebp,
    src: karachaevskJpg
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