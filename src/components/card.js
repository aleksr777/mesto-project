import { closePopup } from './modal.js';
import { popupCardForm, openPopupImage, profileId} from './index.js';
import { deleteCardOnServer, getInitialCards, putLikeOnServer, deleteLikeOnServer } from './api.js';

const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);
const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

const deleteCard = async (button) => {
  const card = button.closest('.card');
  const idCard = card.getAttribute('card-id');
  deleteCardOnServer(card, idCard)
    .then(() => {
      button.setAttribute('disabled', true);
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNumberLikes = (button, card, numLikes) => {
  const likeNumber = card.querySelector('.card__like-number');
  likeNumber.textContent = numLikes; 
  button.setAttribute('disabled', true);
  if (numLikes === 0) {
    likeNumber.classList.add('card__like-number_hidden');
    setTimeout(() => {
      button.classList.remove('card__like-button_position_top');
      button.removeAttribute('disabled');
    }, 200);
  }
  else {
    button.classList.add('card__like-button_position_top');
    setTimeout(() => {
      likeNumber.classList.remove('card__like-number_hidden');
      button.removeAttribute('disabled');
    }, 200);
  }
}

const toggleLikeButton = (button) => {
  const card = button.closest('.card');
  const idCard = card.getAttribute('card-id');
  if (button.classList.contains('card__like-button_activ')) {
    deleteLikeOnServer(button, card, idCard)
      .then((res) => {
        button.classList.remove('card__like-button_activ');
        showNumberLikes(button, card, res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    putLikeOnServer(button, card, idCard)
      .then(res => {
        button.classList.add('card__like-button_activ');
        showNumberLikes(button, card, res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const createCard = (card, splashScreen) => {
  const newCard = cloneNodeTemplate(cardTemplate.content);
  const text = newCard.querySelector('.card__text');
  const image = newCard.querySelector('.card__img');
  const picture = newCard.querySelector('.card__picture');
  const likeButton = newCard.querySelector('.card__like-button');
  const trashButton = newCard.querySelector('.card__trash-button');
  text.textContent = card.name;
  image.src = card.link;
  image.onerror = () => { image.src = splashScreen; }
  picture.addEventListener('click', (event) => openPopupImage(event));
  likeButton.addEventListener('click', (event) => toggleLikeButton(event.currentTarget));
  trashButton.addEventListener('click', (event) => deleteCard(event.currentTarget));
  showNumberLikes(likeButton, newCard, card.likes.length);
  card.likes.forEach((el) => {
    if (el._id === profileId) {
      likeButton.classList.add('card__like-button_activ');
    }
  });
  if (profileId !== card.owner._id) {
    trashButton.remove();
  }
  newCard.setAttribute('card-id', card._id);
  return newCard;
}

const loadInitialCards = (arrCads) => {
  arrCads = arrCads.reverse()
  arrCads.forEach(card => {
    cardsBlock.prepend(createCard(card, splashScreen));
  });
}

export { loadInitialCards }; 