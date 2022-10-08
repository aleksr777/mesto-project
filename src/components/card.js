import { closePopup } from './modal.js';
import { popupCardForm, openPopupImage, profileId, restoreButtonState, submitCardForm } from './index.js';
import { deleteCardOnServer, getInitialCards, putLikeOnServer, deleteLikeOnServer } from './api.js';

const cardsBlock = document.querySelector('.cards-block');
const cardTemplate = document.querySelector('#card-template');
const cloneNodeTemplate = (template) => template.querySelector('.cards-block__card').cloneNode(true);
const splashScreen = new URL('../images/no-image.jpg', import.meta.url);

const deleteCard = async (deleteButton) => {
  const card = deleteButton.closest('.card');
  const idCard = card.getAttribute('card-id');
  deleteCardOnServer(card, idCard)
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
};

const deleteCurrentCard = (event) => {
  deleteCard(event.currentTarget);
  event.stopPropagation();
}

const countLikes = (arrLikes) => {
  let numLikes = 0;
  arrLikes.forEach(() => {
    numLikes += 1;
  });
  return numLikes;
};

const showNumberLikes = (card, numLikes) => {
  if (numLikes === 0) {
    card.querySelector('.card__like-button').style.marginTop = '';
    card.querySelector('.card__like-number').textContent = '';
  }
  else {
    card.querySelector('.card__like-button').style.marginTop = '-15px';
    card.querySelector('.card__like-number').textContent = numLikes;
  }
}

const putLikeLocal = (likeButton, card, arrLikes) => {
  likeButton.classList.add('card__like-button_activ');
  showNumberLikes(card, countLikes(arrLikes));
};

const deleteLikeLocal = (likeButton, card, arrLikes) => {
  likeButton.classList.remove('card__like-button_activ');
  showNumberLikes(card, countLikes(arrLikes));
};

const toggleLikeButton = (likeButton) => {
  const card = likeButton.closest('.card');
  const idCard = card.getAttribute('card-id');
  if (likeButton.classList.contains('card__like-button_activ')) {
    deleteLikeOnServer(likeButton, card, idCard)
      .then(data => {
        deleteLikeLocal(likeButton, card, data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    putLikeOnServer(likeButton, card, idCard)
      .then(res => {
        putLikeLocal(likeButton, card, res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const toggleLikeCurrentButton = (event) => {
  toggleLikeButton(event.currentTarget);
  event.stopPropagation();
}

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
  likeButton.addEventListener('click', (event) => toggleLikeCurrentButton(event));
  trashButton.addEventListener('click', (event) => deleteCurrentCard(event));
  showNumberLikes(newCard, countLikes(card.likes));
  card.likes.forEach((el) => {
    if (el._id === profileId) {
      likeButton.classList.add('card__like-button_activ');
    }
  });

  if (profileId !== card.owner._id) {
    newCard.querySelector('.card__trash-button').style.display = 'none';
  }
  newCard.setAttribute('card-id', card._id);
  return newCard;
}

const loadInitialCards = (initialCards) => {
  initialCards = initialCards.reverse()
  initialCards.forEach(card => {
    cardsBlock.prepend(createCard(card, splashScreen));
  });
}

export { loadInitialCards, putLikeLocal, deleteLikeLocal }; 